/*

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

*/


/**
 * Brute Force - Linear Search
 * Time O(N^2) | Space O(1)
 * https://leetcode.com/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSumBrute = (nums: number[], target: number): number[] => {
	for (let curr = 0; curr < nums.length; curr++) {
		/* Time O(N) */
		const complement = target - nums[curr];

		for (let next = curr + 1; next < nums.length; next++) {
			/* Time O(N) */
			const num = nums[next];

			const isTarget = num === complement;
			if (isTarget) return [curr, next];
		}
	}

	return [-1, -1];
};

/**
 * Hash Map - 2 Pass
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSumtwoPass = (nums: number[], target: number): number[] => {
	const map = getMap(nums); /* Time O(N) | Space O(N) */

	return getSum(nums, target, map); /* Time O(N) */
};

const getMap = (nums: number[], map = new Map<number, number>()): Map<number, number> => {
	for (let index = 0; index < nums.length; index++) {
		/* Time O(N) */
		map.set(nums[index], index); /* Space O(N) */
	}

	return map;
};

const getSum = (nums: number[], target: number, map: Map<number, number>): number[] => {
	for (let index = 0; index < nums.length; index++) {
		/* Time O(N) */
		const complement = target - nums[index];
		// sumIndex can be undefined, while it wont matter so ignoring it
		// @ts-ignore
		const sumIndex: number = map.get(complement);

		const isTarget = map.has(complement) && map.get(complement) !== index;
		if (isTarget) return [index, sumIndex];
	}

	return [-1, -1];
};

/**
 * Hash Map - 1 Pass
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = (nums: number[], target: number, map = new Map<number, number>()) => {
	for (let index = 0; index < nums.length; index++) {
		/* Time O(N) */
		const num = nums[index];
		const complement = target - num;
		const sumIndex = map.get(complement);

		const isTarget = map.has(complement);
		if (isTarget) return [index, sumIndex];

		map.set(num, index); /* Space O(N) */
	}

	return [-1, -1];
};

/**
 * First we loop through the nums array
 * we create 2 vars, the number & the target
 * we call .get to get the index of the targeted sum in the map, if not in returns undefined 
 * next we check if the value is in the map, if it is then we return the index & our sum's index
 * if the check returns false, we insert the number as key and its index as value into the map
 * finally if we reach the end of the number[] and dont find anything, we return [-1, -1]
 */

const numbers = [199, 6, 16, 72, 19, 92, 5, -2, 41, 53, 67];
const target = 11;

console.log(twoSum(numbers, target));
