/*

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

*/

/**
 * Sort - HeapSort Space O(1) | QuickSort Space O(log(N))
 * Time O(N * logN) | Space O(N)
 * https://leetcode.com/problems/valid-anagram/
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagramOne = (s: string, t: string) => {
	const isEqual = s.length === t.length;
	if (!isEqual) return false;

	return reorder(s) === reorder(t); /* Time O(N * logN) | Space O(N) */
};

const reorder = (str: string) =>
	str
		.split('') /* Time O(N)          | Space O(N) */
		.sort((a, b) => a.localeCompare(b)) /* Time O(N * log(N)) | Space O(1 || log(N)) */
		.join(''); /* Time O(N)          | Space O(N) */

/**
 * Hash Map - Frequency Counter
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/valid-anagram/
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagramTwo(s: string, t: string, map = new Map()): boolean {
	// first check if they are equal
	const isEqual = s.length === t.length;
	if (!isEqual) return false; // will exit if the size isn't the same

	addFeq(s, map);
	subFeq(t, map);

	return checkFeq(map);
}

const addFeq = (s: string, map: Map<string, number>) => {
	// count through each item and add
	for (const char of s) {
		const count = (map.get(char) || 0) + 1;

		map.set(char, count);
	}
};

const subFeq = (t: string, map: Map<string, number>) => {
	// count through each item and remove
	for (const char of t) {
		if (!map.has(char)) continue
		// @ts-ignore
		// bug that says that map.get(char) could be undefined. its not. 
    const count = map.get(char) - 1;
    map.set(char, count);
	}
};

const checkFeq = (map: Map<string, number>): boolean => {
	// ignoring char because it is never used
	// @ts-ignore
	for (const [char, count] of map) {
		const isEmpty = count === 0;
		if (!isEmpty) return false;
	}

	return true;
};

/**
 * First we check if the 2 strings are the same length, if they arent we immediately return
 * Next we pass our first string and hash map into our frequency function
 * This function adds each character to the Hash map as keys and their freq. as values
 * Next we pass our second string and Hash map into our subtract freq counter
 * This function removes count values from our hash map if it contains the character
 * Finally we check if the hash map is "empty", meaning all the keys have a value of 0, if true it is anagram!
 */

const s = 'anagram';
const t = 'nagaram';

console.log(isAnagramTwo(s, t));
