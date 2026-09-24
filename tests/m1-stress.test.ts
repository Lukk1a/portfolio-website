import test, { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BentoCard, BentoCardProps } from "../components/ui/bento-card";
import { SectionMarker, SectionMarkerProps, SectionSequenceNumber } from "../components/ui/section-marker";

describe("Milestone 1 Empirical Stress Test Suite", () => {
  // --------------------------------------------------------------------------
  // BentoCard Stress Tests
  // --------------------------------------------------------------------------
  describe("BentoCard: Extreme Children", () => {
    it("renders with null child without crashing", () => {
      const html = renderToStaticMarkup(React.createElement(BentoCard, null, null));
      assert.ok(html.includes("rounded-2xl"));
    });

    it("renders with undefined child without crashing", () => {
      const html = renderToStaticMarkup(React.createElement(BentoCard, null, undefined));
      assert.ok(html.includes("rounded-2xl"));
    });

    it("renders with empty string without crashing", () => {
      const html = renderToStaticMarkup(React.createElement(BentoCard, null, ""));
      assert.ok(html.includes("rounded-2xl"));
    });

    it("renders number children (0 and 42)", () => {
      const htmlZero = renderToStaticMarkup(React.createElement(BentoCard, null, 0));
      assert.ok(htmlZero.includes(">0</div>"));

      const htmlNum = renderToStaticMarkup(React.createElement(BentoCard, null, 42));
      assert.ok(htmlNum.includes(">42</div>"));
    });

    it("renders boolean children (false, true) safely without emitting booleans", () => {
      const htmlFalse = renderToStaticMarkup(React.createElement(BentoCard, null, false));
      assert.ok(htmlFalse.includes("rounded-2xl"));
      assert.ok(!htmlFalse.includes("false"));

      const htmlTrue = renderToStaticMarkup(React.createElement(BentoCard, null, true));
      assert.ok(htmlTrue.includes("rounded-2xl"));
      assert.ok(!htmlTrue.includes("true"));
    });

    it("renders massive text payload (50,000 characters) without error", () => {
      const massiveText = "A".repeat(50000);
      const html = renderToStaticMarkup(React.createElement(BentoCard, null, massiveText));
      assert.ok(html.includes(massiveText));
    });

    it("renders deeply nested React tree (depth 25)", () => {
      let nested: React.ReactNode = "Deep Core";
      for (let i = 0; i < 25; i++) {
        nested = React.createElement("div", { key: i, className: `depth-${i}` }, nested);
      }
      const html = renderToStaticMarkup(React.createElement(BentoCard, null, nested));
      assert.ok(html.includes("depth-0"));
      assert.ok(html.includes("depth-24"));
      assert.ok(html.includes("Deep Core"));
    });

    it("renders heterogeneous multi-child fragment", () => {
      const fragment = React.createElement(
        React.Fragment,
        null,
        React.createElement("h3", null, "Heading"),
        null,
        React.createElement("p", null, "Paragraph"),
        undefined,
        42,
        React.createElement("button", null, "Action")
      );
      const html = renderToStaticMarkup(React.createElement(BentoCard, null, fragment));
      assert.ok(html.includes("<h3>Heading</h3>"));
      assert.ok(html.includes("<p>Paragraph</p>"));
      assert.ok(html.includes("42"));
      assert.ok(html.includes("<button>Action</button>"));
    });
  });

  describe("BentoCard: Missing Optional Props & Defaults", () => {
    it("applies standard single-bezel defaults when only children are passed", () => {
      const element = BentoCard({ children: "Default Test" });
      const html = renderToStaticMarkup(element);

      // Verify baseline single-bezel structure
      assert.ok(html.includes("rounded-2xl"));
      assert.ok(html.includes("p-5 sm:p-6"));
      assert.ok(html.includes("bg-surface-100"));
      assert.ok(html.includes("border-border-subtle"));
      assert.ok(html.includes("shadow-card"));

      // Verify non-interactive defaults
      assert.ok(!html.includes("cursor-pointer"));
      assert.ok(!html.includes("interactive-press"));
      assert.ok(!html.includes("role=\"button\""));
      assert.ok(!html.includes("tabindex"));
      assert.ok(!html.includes("border-glow"));
      assert.ok(!html.includes("shadow-glow-sky"));
    });

    it("supports interactive=true without onClick (visual hover only, non-button)", () => {
      const element = BentoCard({ interactive: true, children: "Interactive Only" });
      const html = renderToStaticMarkup(element);

      assert.ok(html.includes("interactive-press"));
      assert.ok(html.includes("cursor-pointer"));
      assert.ok(html.includes("hover:border-white/20"));
      // Without onClick, it should not default to role="button" or tabIndex=0
      assert.ok(!html.includes("role=\"button\""));
      assert.ok(!html.includes("tabindex"));
    });

    it("automatically assigns role=\"button\" and tabIndex=0 when onClick is provided", () => {
      const onClick = () => {};
      const element = BentoCard({ onClick, children: "Clickable" });
      const html = renderToStaticMarkup(element);

      assert.ok(html.includes("role=\"button\""));
      assert.ok(html.includes("tabindex=\"0\""));
      assert.ok(html.includes("interactive-press"));
      assert.ok(html.includes("cursor-pointer"));
    });

    it("respects explicit role and tabIndex overrides when onClick is provided", () => {
      const onClick = () => {};
      const element = BentoCard({
        onClick,
        role: "link",
        tabIndex: -1,
        children: "Custom Role & TabIndex",
      });
      const html = renderToStaticMarkup(element);

      assert.ok(html.includes("role=\"link\""));
      assert.ok(html.includes("tabindex=\"-1\""));
    });

    it("passes through standard HTML attributes (...props)", () => {
      const element = BentoCard({
        id: "unique-card-id",
        title: "bento-card-title",
        "aria-label": "System Architecture Card",
        children: "Props Passthrough",
      });
      const html = renderToStaticMarkup(element);

      assert.ok(html.includes("id=\"unique-card-id\""));
      assert.ok(html.includes("title=\"bento-card-title\""));
      assert.ok(html.includes("aria-label=\"System Architecture Card\""));
    });
  });

  describe("BentoCard: Custom ClassName & InnerClassName Combinations", () => {
    it("merges custom className in single-bezel mode via cn()", () => {
      const element = BentoCard({
        className: "col-span-2 md:col-span-3 custom-card-override",
        children: "Custom Class Single",
      });
      const html = renderToStaticMarkup(element);

      assert.ok(html.includes("col-span-2"));
      assert.ok(html.includes("md:col-span-3"));
      assert.ok(html.includes("custom-card-override"));
      assert.ok(html.includes("bg-surface-100"));
    });

    it("distributes className to outer and innerClassName to inner in doubleBezel mode", () => {
      const element = BentoCard({
        doubleBezel: true,
        className: "outer-grid-span col-span-4",
        innerClassName: "inner-flex-content justify-between",
        children: "Double Bezel Classes",
      });
      const html = renderToStaticMarkup(element);

      // Outer container has outer classes + outer styling
      assert.ok(html.includes("outer-grid-span"));
      assert.ok(html.includes("col-span-4"));
      assert.ok(html.includes("p-1.5 sm:p-2"));
      assert.ok(html.includes("rounded-2xl"));

      // Inner container has inner classes + inner styling
      assert.ok(html.includes("inner-flex-content"));
      assert.ok(html.includes("justify-between"));
      assert.ok(html.includes("rounded-xl"));
      assert.ok(html.includes("bg-surface-inner/90"));
      assert.ok(html.includes("backdrop-blur-md"));
      assert.ok(html.includes("h-full w-full"));

      // Outer does NOT have innerClassName
      assert.ok(!html.includes("outer-grid-span inner-flex-content"));
    });
  });

  describe("BentoCard: Glow & DoubleBezel Matrix", () => {
    it("matrix cell 1: glow=false, doubleBezel=false", () => {
      const html = renderToStaticMarkup(BentoCard({ glow: false, doubleBezel: false, children: "C1" }));
      assert.ok(!html.includes("border-glow"));
      assert.ok(!html.includes("shadow-glow-sky"));
      assert.ok(!html.includes("bg-surface-inner/90"));
      assert.ok(html.includes("p-5 sm:p-6"));
    });

    it("matrix cell 2: glow=true, doubleBezel=false", () => {
      const html = renderToStaticMarkup(BentoCard({ glow: true, doubleBezel: false, children: "C2" }));
      assert.ok(html.includes("border-glow"));
      assert.ok(html.includes("shadow-glow-sky"));
      assert.ok(!html.includes("bg-surface-inner/90"));
    });

    it("matrix cell 3: glow=false, doubleBezel=true", () => {
      const html = renderToStaticMarkup(BentoCard({ glow: false, doubleBezel: true, children: "C3" }));
      assert.ok(!html.includes("border-glow"));
      assert.ok(!html.includes("shadow-glow-sky"));
      assert.ok(html.includes("p-1.5 sm:p-2"));
      assert.ok(html.includes("bg-surface-inner/90"));
      assert.ok(html.includes("backdrop-blur-md"));
    });

    it("matrix cell 4: glow=true, doubleBezel=true", () => {
      const html = renderToStaticMarkup(BentoCard({ glow: true, doubleBezel: true, children: "C4" }));
      assert.ok(html.includes("border-glow"));
      assert.ok(html.includes("shadow-glow-sky"));
      assert.ok(html.includes("p-1.5 sm:p-2"));
      assert.ok(html.includes("bg-surface-inner/90"));
      assert.ok(html.includes("backdrop-blur-md"));
    });
  });

  describe("BentoCard: Keyboard Interaction (Enter / Space)", () => {
    it("triggers onClick and calls preventDefault on Enter keydown", () => {
      let clicked = 0;
      let prevented = false;

      const element = BentoCard({
        onClick: () => { clicked++; },
        children: "Keyboard Card",
      });

      const fakeEvent = {
        key: "Enter",
        preventDefault: () => { prevented = true; },
      } as React.KeyboardEvent<HTMLDivElement>;

      element.props.onKeyDown(fakeEvent);

      assert.strictEqual(clicked, 1, "onClick should be called on Enter");
      assert.strictEqual(prevented, true, "preventDefault should be called on Enter");
    });

    it("triggers onClick and calls preventDefault on Space (' ') keydown", () => {
      let clicked = 0;
      let prevented = false;

      const element = BentoCard({
        onClick: () => { clicked++; },
        children: "Keyboard Card Space",
      });

      const fakeEvent = {
        key: " ",
        preventDefault: () => { prevented = true; },
      } as React.KeyboardEvent<HTMLDivElement>;

      element.props.onKeyDown(fakeEvent);

      assert.strictEqual(clicked, 1, "onClick should be called on Space");
      assert.strictEqual(prevented, true, "preventDefault should be called on Space");
    });

    it("does NOT trigger onClick or preventDefault on non-activation keys (Tab, Escape, ArrowRight)", () => {
      let clicked = 0;
      let prevented = false;

      const element = BentoCard({
        onClick: () => { clicked++; },
        children: "Keyboard Card Non-activation",
      });

      for (const nonActKey of ["Tab", "Escape", "ArrowRight", "ArrowDown", "Shift", "a"]) {
        prevented = false;
        const fakeEvent = {
          key: nonActKey,
          preventDefault: () => { prevented = true; },
        } as React.KeyboardEvent<HTMLDivElement>;

        element.props.onKeyDown(fakeEvent);
        assert.strictEqual(clicked, 0, `onClick must not be called on key "${nonActKey}"`);
        assert.strictEqual(prevented, false, `preventDefault must not be called on key "${nonActKey}"`);
      }
    });

    it("calls custom onKeyDown prop alongside keyboard activation", () => {
      let clicked = 0;
      let customKeyDownKey = "";

      const element = BentoCard({
        onClick: () => { clicked++; },
        onKeyDown: (e) => { customKeyDownKey = e.key; },
        children: "Custom KeyDown",
      });

      const fakeEvent = {
        key: "Enter",
        preventDefault: () => {},
      } as React.KeyboardEvent<HTMLDivElement>;

      element.props.onKeyDown(fakeEvent);
      assert.strictEqual(clicked, 1);
      assert.strictEqual(customKeyDownKey, "Enter");
    });

    it("executes keyboard handling identically in doubleBezel mode", () => {
      let clicked = 0;
      let prevented = false;

      const element = BentoCard({
        doubleBezel: true,
        onClick: () => { clicked++; },
        children: "Double Bezel Keyboard",
      });

      const fakeEvent = {
        key: "Enter",
        preventDefault: () => { prevented = true; },
      } as React.KeyboardEvent<HTMLDivElement>;

      element.props.onKeyDown(fakeEvent);
      assert.strictEqual(clicked, 1, "onClick should fire on Enter in doubleBezel mode");
      assert.strictEqual(prevented, true, "preventDefault should be called on Enter in doubleBezel mode");
    });
  });

  // --------------------------------------------------------------------------
  // SectionMarker Stress Tests
  // --------------------------------------------------------------------------
  describe("SectionMarker: Sequence Numbers ('01' through '05' + Arbitrary)", () => {
    const validSequences: SectionSequenceNumber[] = ["01", "02", "03", "04", "05"];

    for (const num of validSequences) {
      it(`renders sequence number [${num}] correctly`, () => {
        const html = renderToStaticMarkup(SectionMarker({ number: num, title: `Section ${num}` }));
        assert.ok(html.includes(`[<span class="text-content-primary font-semibold">${num}</span>]`));
        assert.ok(html.includes(`Section ${num}`));
      });
    }

    it("renders arbitrary sequence numbers ('00', '99', 'CLI')", () => {
      for (const arbitrary of ["00", "99", "CLI", "§1"]) {
        const html = renderToStaticMarkup(SectionMarker({ number: arbitrary, title: "Arbitrary" }));
        assert.ok(html.includes(`[<span class="text-content-primary font-semibold">${arbitrary}</span>]`));
      }
    });

    it("omits sequence number badge when number is undefined", () => {
      const html = renderToStaticMarkup(SectionMarker({ title: "No Number Marker" }));
      assert.ok(!html.includes("[<span"));
      assert.ok(html.includes("No Number Marker"));
      assert.ok(html.includes("h-[1px] flex-1 bg-white/[0.08]"));
    });
  });

  describe("SectionMarker: Title, Label & Tag Boundaries", () => {
    it("renders with title prop", () => {
      const html = renderToStaticMarkup(SectionMarker({ number: "01", title: "Technical Stack" }));
      assert.ok(html.includes("Technical Stack"));
    });

    it("renders with legacy label prop (backward compatibility)", () => {
      const html = renderToStaticMarkup(SectionMarker({ number: "02", label: "Legacy Engineering Rules" }));
      assert.ok(html.includes("Legacy Engineering Rules"));
    });

    it("prioritizes title prop over label prop when both are provided", () => {
      const html = renderToStaticMarkup(SectionMarker({
        number: "03",
        title: "Primary Title",
        label: "Secondary Label",
      }));
      assert.ok(html.includes("Primary Title"));
      assert.ok(!html.includes("Secondary Label"));
    });

    it("renders tag when provided with responsive hidden sm:inline-block classes", () => {
      const html = renderToStaticMarkup(SectionMarker({
        number: "04",
        title: "Active Radar",
        tag: "3 Active Tracks",
      }));
      assert.ok(html.includes("3 Active Tracks"));
      assert.ok(html.includes("hidden sm:inline-block"));
    });

    it("omits tag element when tag is undefined", () => {
      const html = renderToStaticMarkup(SectionMarker({ number: "05", title: "Direct Contact" }));
      assert.ok(!html.includes("hidden sm:inline-block"));
    });

    it("handles extreme title strings and special characters safely", () => {
      const extremeTitle = "Systems Architecture & C++20 Memory Arena <Virtual-RAM> // $0x7FFE";
      const html = renderToStaticMarkup(SectionMarker({ number: "03", title: extremeTitle, tag: "ASM" }));
      assert.ok(html.includes("Systems Architecture &amp; C++20 Memory Arena &lt;Virtual-RAM&gt; // $0x7FFE"));
      assert.ok(html.includes("ASM"));
    });

    it("always renders horizontal rule divider", () => {
      const html = renderToStaticMarkup(SectionMarker({}));
      assert.ok(html.includes("h-[1px] flex-1 bg-white/[0.08]"));
    });

    it("merges custom className onto root container", () => {
      const html = renderToStaticMarkup(SectionMarker({
        number: "01",
        title: "Test",
        className: "custom-marker-margin mb-6 pt-4",
      }));
      assert.ok(html.includes("custom-marker-margin"));
      assert.ok(html.includes("pt-4"));
    });
  });

  // --------------------------------------------------------------------------
  // Design System Tokens & Asset Verification
  // --------------------------------------------------------------------------
  describe("Design System & Static Assets", () => {
    it("verifies screenshot.png is exactly 148,045 bytes", () => {
      const screenshotPath = path.resolve(process.cwd(), "screenshot.png");
      assert.ok(fs.existsSync(screenshotPath), "screenshot.png must exist");
      const stats = fs.statSync(screenshotPath);
      assert.strictEqual(
        stats.size,
        148045,
        `screenshot.png size must be exactly 148045 bytes, found ${stats.size}`
      );
    });

    it("verifies tailwind.config.js contains all required M1 design tokens", () => {
      const configPath = path.resolve(process.cwd(), "tailwind.config.js");
      assert.ok(fs.existsSync(configPath), "tailwind.config.js must exist");
      const configContent = fs.readFileSync(configPath, "utf-8");

      // Surfaces
      assert.ok(configContent.includes("inner: \"#0c0c0c\""), "surface.inner token missing");
      assert.ok(configContent.includes("50: \"#1d1c1a\""), "surface.50 token missing");
      assert.ok(configContent.includes("100: \"#1a1917\""), "surface.100 token missing");
      assert.ok(configContent.includes("200: \"#161615\""), "surface.200 token missing");
      assert.ok(configContent.includes("300: \"#121110\""), "surface.300 token missing");

      // Borders
      assert.ok(configContent.includes("hairline: \"rgba(255, 255, 255, 0.08)\""), "border.hairline missing");
      assert.ok(configContent.includes("subtle: \"rgba(255, 255, 255, 0.08)\""), "border.subtle missing");
      assert.ok(configContent.includes("glow: \"rgba(56, 189, 248, 0.35)\""), "border.glow missing");

      // Accents & Shadows
      assert.ok(configContent.includes("sky: \"#38bdf8\""), "accent.sky missing");
      assert.ok(configContent.includes("emerald: \"#34d399\""), "accent.emerald missing");
      assert.ok(configContent.includes("\"glow-sky\""), "shadow glow-sky missing");
      assert.ok(configContent.includes("\"inner-bezel\""), "shadow inner-bezel missing");
    });

    it("verifies app/globals.css contains double-bezel, border-glow, and overflow constraints", () => {
      const cssPath = path.resolve(process.cwd(), "app/globals.css");
      assert.ok(fs.existsSync(cssPath), "app/globals.css must exist");
      const cssContent = fs.readFileSync(cssPath, "utf-8");

      assert.ok(cssContent.includes(".double-bezel"), ".double-bezel class missing in globals.css");
      assert.ok(cssContent.includes(".double-bezel-inner"), ".double-bezel-inner class missing in globals.css");
      assert.ok(cssContent.includes(".border-glow"), ".border-glow class missing in globals.css");
      assert.ok(cssContent.includes(".interactive-press"), ".interactive-press class missing in globals.css");
      assert.ok(cssContent.includes("overflow-x: hidden;"), "overflow-x: hidden constraint missing in globals.css");
    });

    it("verifies pages/500.tsx exists and exports valid React component", () => {
      const page500Path = path.resolve(process.cwd(), "pages/500.tsx");
      assert.ok(fs.existsSync(page500Path), "pages/500.tsx must exist");
      const page500Content = fs.readFileSync(page500Path, "utf-8");

      assert.ok(page500Content.includes("export default function Custom500"), "Custom500 default export missing");
      assert.ok(page500Content.includes("500"), "500 text missing");
    });
  });
});
