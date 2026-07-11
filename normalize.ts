/**
 * Question normalization — fills schema defaults before the UI runs.
 *
 * `id` and option `value` are optional in the tool schema to keep single-question
 * calls lightweight; this module derives them deterministically.
 */

export interface QuestionOption {
	value: string;
	label: string;
	description?: string;
}

export interface Question {
	id: string;
	label: string;
	prompt: string;
	options: QuestionOption[];
	allowOther: boolean;
	allowMultiple: boolean;
}

export interface QuestionOptionInput {
	value?: string;
	label: string;
	description?: string;
}

export interface QuestionInput {
	id?: string;
	label?: string;
	prompt: string;
	options: QuestionOptionInput[];
	allowOther?: boolean;
	allowMultiple?: boolean;
}

/**
 * Defaults: id → q1, q2, … (deduped on collision), label → Q1, Q2, …,
 * option value → its label, allowOther → true, allowMultiple → false.
 */
export function normalizeQuestions(input: QuestionInput[]): Question[] {
	const usedIds = new Set<string>();
	return input.map((q, i) => {
		const base = q.id || `q${i + 1}`;
		let id = base;
		for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
		usedIds.add(id);
		return {
			id,
			label: q.label || `Q${i + 1}`,
			prompt: q.prompt,
			options: q.options.map((o) => ({ ...o, value: o.value ?? o.label })),
			allowOther: q.allowOther !== false,
			allowMultiple: q.allowMultiple === true,
		};
	});
}
