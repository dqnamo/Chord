import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-07-30T12:00:00Z"));
  await page.goto("/components/calendar");
});

test("supports the complete calendar workflow", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "The complete interaction workflow is covered at desktop size.",
  );

  const calendar = page.getByTestId("calendar-demo");

  await expect(
    calendar.getByRole("heading", { name: "July 2026" }),
  ).toBeVisible();

  await calendar.getByRole("button", { name: "Month view" }).click();
  await expect(calendar.getByRole("grid", { name: "July 2026" })).toBeVisible();
  await expect(
    calendar.locator('[role="rowgroup"] > [role="row"]'),
  ).toHaveCount(5);

  await calendar.getByRole("button", { name: "Week view" }).click();
  await expect(
    calendar.getByRole("grid", { name: "Calendar time grid" }),
  ).toBeVisible();

  const event = calendar.getByRole("button", {
    name: "Design review, 27 Jul 2026, 09:00–10:15",
  });
  await event.click({ position: { x: 8, y: 8 } });
  await expect(
    page.getByRole("dialog", { name: "Design review" }),
  ).toContainText("Studio 2");
  await page.keyboard.press("Escape");

  const slot = calendar.getByRole("gridcell", {
    name: "Thursday 30 July, 13:00",
  });
  await slot.press("Enter");
  await expect(
    calendar.getByRole("button", {
      name: "New event, 30 Jul 2026, 13:00–13:15",
    }),
  ).toBeVisible();
  await expect(calendar.locator("[data-calendar-announcer]")).toContainText(
    "Created an event",
  );

  const customer = calendar.getByRole("button", {
    name: "Customer call, 30 Jul 2026, 14:00–15:00",
  });
  await customer.press("Alt+ArrowRight");
  const movedCustomer = calendar.getByRole("button", {
    name: "Customer call, 31 Jul 2026, 14:00–15:00",
  });
  await expect(movedCustomer).toBeVisible();
  await movedCustomer.press("Alt+Shift+ArrowDown");
  await expect(
    calendar.getByRole("button", {
      name: "Customer call, 31 Jul 2026, 14:00–15:15",
    }),
  ).toBeVisible();

  await calendar.getByRole("button", { name: "Day view" }).click();
  await expect(
    calendar.getByRole("heading", { name: "Thursday, 30 July 2026" }),
  ).toBeVisible();

  await calendar.getByRole("button", { name: "Agenda view" }).click();
  await expect(
    calendar.getByRole("region", { name: "Thursday, 30 July 2026" }),
  ).toBeVisible();
  await expect(
    calendar.getByRole("button", { name: "Load 30 more days" }),
  ).toBeVisible();
});

test("moves and resizes events with the pointer", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "Mouse geometry is covered by the desktop browser project.",
  );

  const calendar = page.getByTestId("calendar-demo");
  const event = calendar.getByRole("button", {
    name: "Design review, 27 Jul 2026, 09:00–10:15",
  });
  const targetSlot = calendar.getByRole("gridcell", {
    name: "Tuesday 28 July, 9:00",
  });
  const eventBox = await event.boundingBox();
  const targetBox = await targetSlot.boundingBox();

  expect(eventBox).not.toBeNull();
  expect(targetBox).not.toBeNull();

  if (!eventBox || !targetBox) {
    return;
  }

  await page.mouse.move(eventBox.x + 8, eventBox.y + 8);
  await page.mouse.down();
  await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + 8, {
    steps: 8,
  });
  await page.mouse.up();

  const movedEvent = calendar.getByRole("button", {
    name: "Design review, 28 Jul 2026, 09:00–10:15",
  });
  await expect(movedEvent).toBeVisible();

  const resizeHandle = calendar.getByRole("button", {
    name: "Resize Design review",
  });
  const resizeBox = await resizeHandle.boundingBox();
  const resizeTarget = await calendar
    .getByRole("gridcell", { name: "Tuesday 28 July, 11:00" })
    .boundingBox();

  expect(resizeBox).not.toBeNull();
  expect(resizeTarget).not.toBeNull();

  if (!resizeBox || !resizeTarget) {
    return;
  }

  await page.mouse.move(
    resizeBox.x + resizeBox.width / 2,
    resizeBox.y + resizeBox.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    resizeTarget.x + resizeTarget.width / 2,
    resizeTarget.y,
    { steps: 8 },
  );
  await page.mouse.up();

  await expect(
    calendar.getByRole("button", {
      name: "Design review, 28 Jul 2026, 09:00–11:00",
    }),
  ).toBeVisible();
});

test("has no automated accessibility violations", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "The same semantic tree is scanned in the desktop project.",
  );

  const results = await new AxeBuilder({ page })
    .include('[data-testid="calendar-demo"]')
    .analyze();

  expect(results.violations).toEqual([]);
});

test("keeps the month view contained on narrow screens", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "The narrow layout is covered by the mobile project.",
  );

  const calendar = page.getByTestId("calendar-demo");
  await calendar.getByRole("button", { name: "Month view" }).click();
  await expect(calendar.getByRole("grid", { name: "July 2026" })).toBeVisible();

  const dimensions = await calendar.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
  await expect(calendar).toHaveScreenshot("calendar-month-mobile.png", {
    animations: "disabled",
  });
});
