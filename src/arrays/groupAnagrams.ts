/*

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

*/

/**
 * Sort - HeapSort Space O(1) | QuickSort Space O(log(M))
 * Hash Map - Adjacency List
 * Time O(N * (K * log(K))) | Space O(N * K)
 * https://leetcode.com/problems/group-anagrams/
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs: string[], map = new Map<string, string[]>()): string[][] {
	if (!strs.length) return [];

	groupWords(strs, map); /* Time O(N * (K * log(K)) | Space O(N * K) */

	return [...map.values()]; /* Time O(N) | Space O(N * K) */
}

const groupWords = (strs: string[], map: Map<string, string[]>): void => {
	for (let i of strs) /* Time O(N) */ {
		const sorted = reorderB(i); /* Time O(K * log(K)) | Space O(K) */
		const values = map.get(sorted) || [];

		values.push(i); /*  | Space O(N) */
		map.set(sorted, values); /*  | Space O(N * K) */
	}
};

const reorderB = (word: string): string => {
	return word.split('').sort().join('');
	/* Time O(K)          | Space O(K) */
	/* Time O(K * log(K)) | Space O(1 || log(K)) */
	/* Time O(K)          | Space O(K) */
};

/**
 * Hash Map
 * Time O(N * K) | Space O(N * K)
 * https://leetcode.com/problems/group-anagrams/
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagramsBest = (strs: string[], map = new Map<string, string[]>()) => {
	if (!strs.length) return [];

	groupWordsBest(strs, map); /* Time O(N * K) | Space O(N * K) */

	return [...map.values()]; /* Time O(N)     | Space O(N * K) */
};

var groupWordsBest = (strs: string[], map: Map<string, string[]>) => {
	for (const i of strs) /* Time O(N) */ {
		const hash = getHash(i); /* Time O(K) | Space O(1) */
		const values = map.get(hash) || []; // We are basing it off the string converted from the freq array

		values.push(i); /*           | Space O(N) */
		map.set(hash, values); /*           | Space O(N * K) */
		// our map looks something like this ["0,0,1,0,2,0,0,1...,0,0,0": [["word, word, word"],["example, example"]]]
	}
};

const getHash = (strs: string) => {
	const frequency: number[] = new Array(26).fill(0);

	for (const char of strs) /* Time O(K) */ {
		const charCode = getCode(char); /* Time O(1) | Space (1) */

		frequency[charCode]++; /*           | Space O(1) */
	}

	return buildHash(frequency);
};

/*
    This function is to generate an ASCII code for a - z.
    If you imagine 'a' as 97, you pass in 'a'. 97 - 97, would return 0.
    therefore 'b' would be '98' and return 1, and so on
*/
const getCode = (char: string) => char.charCodeAt(0) - 'a'.charCodeAt(0);

// This simply turns our number array into a string
const buildHash = (frequency: number[]) => frequency.toString();

const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

console.log(groupAnagramsBest(strs))
