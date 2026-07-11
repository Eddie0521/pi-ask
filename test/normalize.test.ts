/** normalizeQuestions 测试 */

import { test, expect } from "bun:test";
import { normalizeQuestions } from "../normalize.ts";

test("defaults id, label, and option value", () => {
	const qs = normalizeQuestions([
		{ prompt: "Pick one", options: [{ label: "A" }, { label: "B", value: "b-val" }] },
	]);
	expect(qs[0].id).toBe("q1");
	expect(qs[0].label).toBe("Q1");
	expect(qs[0].options[0].value).toBe("A");
	expect(qs[0].options[1].value).toBe("b-val");
	expect(qs[0].allowOther).toBe(true);
	expect(qs[0].allowMultiple).toBe(false);
});

test("keeps provided ids and dedupes collisions", () => {
	const qs = normalizeQuestions([
		{ id: "scope", prompt: "a", options: [] },
		{ id: "scope", prompt: "b", options: [] },
		{ prompt: "c", options: [] },
	]);
	expect(qs.map((q) => q.id)).toEqual(["scope", "scope-2", "q3"]);
});

test("generated ids avoid colliding with provided ones", () => {
	const qs = normalizeQuestions([
		{ id: "q2", prompt: "a", options: [] },
		{ prompt: "b", options: [] },
	]);
	expect(qs[0].id).toBe("q2");
	expect(qs[1].id).toBe("q2-2");
});

test("respects explicit flags", () => {
	const qs = normalizeQuestions([
		{ prompt: "x", options: [], allowOther: false, allowMultiple: true },
	]);
	expect(qs[0].allowOther).toBe(false);
	expect(qs[0].allowMultiple).toBe(true);
});
