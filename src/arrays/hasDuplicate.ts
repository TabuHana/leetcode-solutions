/*

Contains Duplicate

Given an integer array "nums", return "true" if any value appears !at least twice! in the array, and return "
false" if every element is distint.

*/

/**
 * Brute Force - Linear Search
 * Time O(N^2) | Space O(1)
 * https://leetcode.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
 */
export const containsDuplicateBrute = (nums: number[]) => {
	for (let right = 0; right < nums.length; right++) {
		/* Time O(N) */
		for (let left = 0; left < right; left++) {
			/* Time O(N) */
			const isDuplicate = nums[left] === nums[right];
			if (isDuplicate) return true;
		}
	}

	return false;
};

/**
 * Sort - HeapSort Space O(1) | QuickSort Space O(log(N))
 * Time O(N * log(N)) | Space O(1)
 * https://leetcode.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
 */
export const containsDuplicateHeapSort = (nums: number[]) => {
	nums.sort((a: number, b: number) => a - b); /* Time O(N * log(N)) | Space O(1 || log(N)) */

	return hasDuplicate(nums);
};

export const hasDuplicate = (nums: number[]) => {
	for (let curr = 0; curr < nums.length - 1; curr++) {
		/* Time O(N) */
		const next = curr + 1;

		const isNextDuplicate = nums[curr] === nums[next];
		if (isNextDuplicate) return true;
	}

	return false;
};


/**
 * Hash Set - Early Exit
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
*/
export const containsDuplicateEarly = (nums: number[], numsSet = new Set()) => {
	for (const num of nums) {
		/* Time O(N) */
		if (numsSet.has(num)) return true;
		
		numsSet.add(num); /* Space O(N) */
	}
	
	return false;
};


/**
 * Best solution!
 * Hash Set
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
 */
 export const containsDuplicateBest = (nums: number[]) => {
	const s = new Set(nums); /* Time O(N) | Space O(N) */
	const isEqual = s.size !== nums.length;

	return isEqual;
};

/**
 * By using a Hash Set, we can check if the array contains a duplicate because a Set can only have unique values. 
 * Once we store all the values into the set, we simply have to check if it is the same length as the original array.
 * Because if it is not the same size as the array, it is because there was a duplicate and was rejected when inserting into the array!!
 */

let vals = [4,5,12,5,6,2,613,4,463,626,16,4]

console.log(containsDuplicateBest(vals))