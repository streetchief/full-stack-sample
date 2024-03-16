import { describe, expect, test } from "@jest/globals";
import { simpleRepo, } from "./github.adapter.ts";
import type { Repo, SimpleRepo } from "../../../repo.d.ts";

describe("simpleRepo", () => {
  test(" repo to clean repo objects", () => {
    const input: Repo = { html_url: 'foo', id: 1, name: 'bar', fake: 'nope', };
    const output: any = simpleRepo(input);
    expect(output.html_url).toBeUndefined();
    expect(output.id).toBe(1);
    expect(output.name).toBe('bar');
    expect(output.url).toBe('foo');
  });
});
