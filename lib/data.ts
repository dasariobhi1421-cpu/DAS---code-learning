export interface VideoLesson {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  description: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: string;
  tags: string[];
  logic: string[];
  timeComplexity: string;
  spaceComplexity: string;
  solutionVideoId?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalProblems: number;
  totalVideos: number;
  videos: VideoLesson[];
  problems: Problem[];
}

export const topics: Topic[] = [
  // ────────────────────────────────────────────
  // 1. ARRAYS
  // ────────────────────────────────────────────
  {
    id: "arrays",
    title: "Arrays",
    description:
      "Learn about array manipulation, searching, sorting, and common patterns like two pointers and sliding window.",
    icon: "brackets",
    color: "primary",
    totalProblems: 7,
    totalVideos: 3,
    videos: [
      {
        id: "arr-v1",
        title: "Introduction to Arrays",
        youtubeId: "QJNwK2uJyGs",
        duration: "15:30",
        description:
          "Learn the basics of arrays, how they are stored in memory, and fundamental operations like insertion, deletion, and traversal.",
      },
      {
        id: "arr-v2",
        title: "Two Pointer Technique",
        youtubeId: "On03HWe2tZM",
        duration: "22:15",
        description:
          "Master the two pointer technique to solve problems efficiently with O(n) time complexity.",
      },
      {
        id: "arr-v3",
        title: "Sliding Window Pattern",
        youtubeId: "MK-NZ4hN7rs",
        duration: "18:45",
        description:
          "Understand the sliding window pattern used to solve subarray and substring problems optimally.",
      },
    ],
    problems: [
      {
        id: "arr-p1",
        title: "Two Sum",
        difficulty: "Easy",
        description:
          "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
          },
          { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        ],
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9",
          "Only one valid answer exists.",
        ],
        starterCode: `function twoSum(nums, target) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Map", "Array"],
        logic: [
          "Brute force: Check every pair of numbers (O(n^2)).",
          "Optimal: Use a Hash Map to store each number and its index.",
          "For each number, calculate complement = target - nums[i].",
          "Check if complement already exists in the map.",
          "If yes, return [map[complement], i]. If no, store nums[i] -> i in the map.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "KLlXCFG5TnA",
      },
      {
        id: "arr-p2",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description:
          "You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
        examples: [
          {
            input: "prices = [7,1,5,3,6,4]",
            output: "5",
            explanation:
              "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
          },
          {
            input: "prices = [7,6,4,3,1]",
            output: "0",
            explanation:
              "In this case, no transactions are done and the max profit = 0.",
          },
        ],
        constraints: [
          "1 <= prices.length <= 10^5",
          "0 <= prices[i] <= 10^4",
        ],
        starterCode: `function maxProfit(prices) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Dynamic Programming"],
        logic: [
          "Track the minimum price seen so far as you iterate.",
          "At each day, calculate the profit if you sold today: prices[i] - minPrice.",
          "Update maxProfit if the current profit is larger.",
          "Update minPrice if prices[i] is smaller than current minPrice.",
          "Return maxProfit after one pass through the array.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "1pkOgXD63yU",
      },
      {
        id: "arr-p3",
        title: "Contains Duplicate",
        difficulty: "Easy",
        description:
          "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
        examples: [
          { input: "nums = [1,2,3,1]", output: "true" },
          { input: "nums = [1,2,3,4]", output: "false" },
        ],
        constraints: [
          "1 <= nums.length <= 10^5",
          "-10^9 <= nums[i] <= 10^9",
        ],
        starterCode: `function containsDuplicate(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Hash Table", "Sorting"],
        logic: [
          "Use a Set to store numbers we have already seen.",
          "Iterate through the array; for each element check if it exists in the Set.",
          "If it exists, return true (duplicate found).",
          "Otherwise, add the element to the Set.",
          "If we finish the loop without returning, return false.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "3OamzN90kPg",
      },
      {
        id: "arr-p4",
        title: "Maximum Subarray",
        difficulty: "Medium",
        description:
          "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
        examples: [
          {
            input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
            output: "6",
            explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
          },
          {
            input: "nums = [5,4,-1,7,8]",
            output: "23",
            explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
          },
        ],
        constraints: [
          "1 <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4",
        ],
        starterCode: `function maxSubArray(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
        logic: [
          "Use Kadane's Algorithm: maintain a running sum (currentSum) and a global maximum (maxSum).",
          "At each index, decide: extend the current subarray or start fresh from this element.",
          "currentSum = Math.max(nums[i], currentSum + nums[i]).",
          "Update maxSum = Math.max(maxSum, currentSum).",
          "Return maxSum after iterating through all elements.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "5WZl3MMT0Eg",
      },
      {
        id: "arr-p5",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        description:
          "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must write an algorithm that runs in O(n) time and without using the division operation.",
        examples: [
          { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
          { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        ],
        constraints: [
          "2 <= nums.length <= 10^5",
          "-30 <= nums[i] <= 30",
          "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
        ],
        starterCode: `function productExceptSelf(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Prefix Sum"],
        logic: [
          "Build a prefix product array: prefix[i] = product of all elements before index i.",
          "Build a suffix product array: suffix[i] = product of all elements after index i.",
          "answer[i] = prefix[i] * suffix[i].",
          "Optimized: use the output array for prefix, and a running variable for suffix (right-to-left pass).",
          "This avoids extra space beyond the output array.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1) excluding output",
        solutionVideoId: "bNvIQI2wAjk",
      },
      {
        id: "arr-p6",
        title: "3Sum",
        difficulty: "Medium",
        description:
          "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
        examples: [
          {
            input: "nums = [-1,0,1,2,-1,-4]",
            output: "[[-1,-1,2],[-1,0,1]]",
            explanation:
              "The distinct triplets are [-1,0,1] and [-1,-1,2].",
          },
          { input: "nums = [0,1,1]", output: "[]" },
        ],
        constraints: [
          "3 <= nums.length <= 3000",
          "-10^5 <= nums[i] <= 10^5",
        ],
        starterCode: `function threeSum(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Two Pointers", "Sorting"],
        logic: [
          "Sort the array first.",
          "Fix one element (nums[i]) and use two pointers for the remaining pair.",
          "Left pointer starts at i+1, right pointer at end.",
          "If sum < 0, move left pointer right. If sum > 0, move right pointer left.",
          "Skip duplicates by advancing pointers past repeated values.",
        ],
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1) excluding output",
        solutionVideoId: "jzZsG8n2R9A",
      },
      {
        id: "arr-p7",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        description:
          "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        examples: [
          {
            input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
            output: "6",
            explanation:
              "6 units of rain water are being trapped.",
          },
          { input: "height = [4,2,0,3,2,5]", output: "9" },
        ],
        constraints: [
          "n == height.length",
          "1 <= n <= 2 * 10^4",
          "0 <= height[i] <= 10^5",
        ],
        starterCode: `function trap(height) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Two Pointers", "Stack"],
        logic: [
          "Water at any index i = min(maxLeft, maxRight) - height[i].",
          "Use two pointers: left and right, starting at the two ends.",
          "Maintain leftMax and rightMax as the tallest bars seen from each side.",
          "If leftMax < rightMax, process left side (water = leftMax - height[left]).",
          "Otherwise process right side. Move the pointer inward each step.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "ZI2z5pq0TqA",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 2. STRINGS
  // ────────────────────────────────────────────
  {
    id: "strings",
    title: "Strings",
    description:
      "Master string manipulation, pattern matching, and common algorithms like palindrome checking and anagram detection.",
    icon: "text",
    color: "accent",
    totalProblems: 6,
    totalVideos: 2,
    videos: [
      {
        id: "str-v1",
        title: "String Fundamentals",
        youtubeId: "Wdjr6uoZ0e0",
        duration: "20:10",
        description:
          "Learn string basics including immutability, common operations, and how strings are stored in memory.",
      },
      {
        id: "str-v2",
        title: "String Pattern Matching",
        youtubeId: "BRnePi_kiSE",
        duration: "25:00",
        description:
          "Explore string matching algorithms and pattern recognition techniques used in coding interviews.",
      },
    ],
    problems: [
      {
        id: "str-p1",
        title: "Valid Anagram",
        difficulty: "Easy",
        description:
          "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram is a word formed by rearranging the letters of a different word, using all the original letters exactly once.",
        examples: [
          { input: 's = "anagram", t = "nagaram"', output: "true" },
          { input: 's = "rat", t = "car"', output: "false" },
        ],
        constraints: [
          "1 <= s.length, t.length <= 5 * 10^4",
          "s and t consist of lowercase English letters.",
        ],
        starterCode: `function isAnagram(s, t) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Table", "String", "Sorting"],
        logic: [
          "If lengths differ, immediately return false.",
          "Create a frequency map (size-26 array) for characters in s.",
          "Decrement counts for each character in t.",
          "If any count goes below zero, return false.",
          "If all counts are zero at the end, return true.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1) - fixed 26 chars",
        solutionVideoId: "9UtInBqnCgA",
      },
      {
        id: "str-p2",
        title: "Valid Palindrome",
        difficulty: "Easy",
        description:
          "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        examples: [
          {
            input: 's = "A man, a plan, a canal: Panama"',
            output: "true",
            explanation: '"amanaplanacanalpanama" is a palindrome.',
          },
          {
            input: 's = "race a car"',
            output: "false",
            explanation: '"raceacar" is not a palindrome.',
          },
        ],
        constraints: [
          "1 <= s.length <= 2 * 10^5",
          "s consists only of printable ASCII characters.",
        ],
        starterCode: `function isPalindrome(s) {\n  // Write your solution here\n  \n}`,
        tags: ["Two Pointers", "String"],
        logic: [
          "Use two pointers: left = 0, right = s.length - 1.",
          "Skip non-alphanumeric characters from both sides.",
          "Compare lowercase versions of characters at left and right.",
          "If mismatch, return false. Otherwise, move both pointers inward.",
          "If pointers cross, the string is a palindrome.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "jJXJ16kPFWg",
      },
      {
        id: "str-p3",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description:
          "Given a string `s`, find the length of the longest substring without repeating characters.",
        examples: [
          {
            input: 's = "abcabcbb"',
            output: "3",
            explanation: 'The answer is "abc", with the length of 3.',
          },
          {
            input: 's = "bbbbb"',
            output: "1",
            explanation: 'The answer is "b", with the length of 1.',
          },
        ],
        constraints: [
          "0 <= s.length <= 5 * 10^4",
          "s consists of English letters, digits, symbols and spaces.",
        ],
        starterCode: `function lengthOfLongestSubstring(s) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Table", "String", "Sliding Window"],
        logic: [
          "Use the Sliding Window technique with a Set to track characters in the current window.",
          "Expand the window by moving the right pointer and adding characters to the Set.",
          "If a duplicate is found, shrink the window from the left until the duplicate is removed.",
          "Track the maximum window size at each step.",
          "Return the maximum size found.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, 128))",
        solutionVideoId: "wiGpQwVHdE0",
      },
      {
        id: "str-p4",
        title: "Group Anagrams",
        difficulty: "Medium",
        description:
          'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
        examples: [
          {
            input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
            output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
          },
          { input: 'strs = [""]', output: '[[""]]' },
        ],
        constraints: [
          "1 <= strs.length <= 10^4",
          "0 <= strs[i].length <= 100",
          "strs[i] consists of lowercase English letters.",
        ],
        starterCode: `function groupAnagrams(strs) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Hash Table", "String", "Sorting"],
        logic: [
          "Anagrams have the same set of characters, just in different order.",
          "Sort each string alphabetically to create a canonical key.",
          "Use a HashMap where key = sorted string, value = list of original strings.",
          "Iterate through all strings, sort each, and group them by sorted key.",
          "Return all the values of the HashMap.",
        ],
        timeComplexity: "O(n * k log k) where k = max string length",
        spaceComplexity: "O(n * k)",
        solutionVideoId: "vzdNOK2oB2E",
      },
      {
        id: "str-p5",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        description:
          "Given a string `s`, return the longest palindromic substring in `s`.",
        examples: [
          {
            input: 's = "babad"',
            output: '"bab"',
            explanation: '"aba" is also a valid answer.',
          },
          { input: 's = "cbbd"', output: '"bb"' },
        ],
        constraints: [
          "1 <= s.length <= 1000",
          "s consist of only digits and English letters.",
        ],
        starterCode: `function longestPalindrome(s) {\n  // Write your solution here\n  \n}`,
        tags: ["String", "Dynamic Programming", "Two Pointers"],
        logic: [
          "Expand Around Center approach: every palindrome has a center.",
          "For each index, try expanding outward as both odd-length and even-length centers.",
          "For odd: center at i; for even: center between i and i+1.",
          "Expand while characters match; track the longest palindrome found.",
          "Return the longest substring.",
        ],
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
        solutionVideoId: "XYQecbcd6_c",
      },
      {
        id: "str-p6",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        description:
          "Given two strings `s` and `t` of lengths m and n respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string.",
        examples: [
          {
            input: 's = "ADOBECODEBANC", t = "ABC"',
            output: '"BANC"',
            explanation: "The minimum window substring is BANC.",
          },
          { input: 's = "a", t = "a"', output: '"a"' },
        ],
        constraints: [
          "m == s.length, n == t.length",
          "1 <= m, n <= 10^5",
          "s and t consist of uppercase and lowercase English letters.",
        ],
        starterCode: `function minWindow(s, t) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Table", "String", "Sliding Window"],
        logic: [
          "Use Sliding Window with two pointers and a frequency map for t.",
          "Expand the right pointer to include characters until all of t is covered.",
          "Once all characters are covered, shrink from the left to find the minimum window.",
          "Track the minimum length window that contains all characters of t.",
          "Use a 'formed' counter to know when all required characters are satisfied.",
        ],
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m + n)",
        solutionVideoId: "jSto0O4AJbM",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 3. LINKED LISTS
  // ────────────────────────────────────────────
  {
    id: "linked-lists",
    title: "Linked Lists",
    description:
      "Understand singly and doubly linked lists, pointer manipulation, and classic problems like cycle detection and reversal.",
    icon: "link",
    color: "primary",
    totalProblems: 6,
    totalVideos: 2,
    videos: [
      {
        id: "ll-v1",
        title: "Linked List Basics",
        youtubeId: "Hj_rA0dhr2I",
        duration: "19:20",
        description:
          "Introduction to linked lists, node structure, and basic operations like insertion and deletion.",
      },
      {
        id: "ll-v2",
        title: "Fast and Slow Pointers",
        youtubeId: "gBTe7lFR3vc",
        duration: "16:40",
        description:
          "Learn the fast and slow pointer technique used for cycle detection and finding middle elements.",
      },
    ],
    problems: [
      {
        id: "ll-p1",
        title: "Reverse Linked List",
        difficulty: "Easy",
        description:
          "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
        examples: [
          { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
          { input: "head = [1,2]", output: "[2,1]" },
        ],
        constraints: [
          "The number of nodes in the list is the range [0, 5000].",
          "-5000 <= Node.val <= 5000",
        ],
        starterCode: `function reverseList(head) {\n  // Write your solution here\n  \n}`,
        tags: ["Linked List", "Recursion"],
        logic: [
          "Use three pointers: prev = null, curr = head, next = null.",
          "Iterate through the list.",
          "At each node: save next = curr.next, then reverse the pointer curr.next = prev.",
          "Move prev = curr, curr = next.",
          "When curr is null, prev is the new head. Return prev.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "G0_I-ZF0S38",
      },
      {
        id: "ll-p2",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        description:
          "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list by splicing together the nodes. Return the head of the merged linked list.",
        examples: [
          {
            input: "list1 = [1,2,4], list2 = [1,3,4]",
            output: "[1,1,2,3,4,4]",
          },
          { input: "list1 = [], list2 = []", output: "[]" },
        ],
        constraints: [
          "The number of nodes in both lists is in the range [0, 50].",
          "-100 <= Node.val <= 100",
          "Both lists are sorted in non-decreasing order.",
        ],
        starterCode: `function mergeTwoLists(list1, list2) {\n  // Write your solution here\n  \n}`,
        tags: ["Linked List", "Recursion"],
        logic: [
          "Create a dummy node to act as the start of the merged list.",
          "Use a pointer (current) starting at the dummy node.",
          "Compare the values at the heads of both lists.",
          "Attach the smaller node to current.next and advance that list's pointer.",
          "After one list is exhausted, attach the remaining nodes. Return dummy.next.",
        ],
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(1)",
        solutionVideoId: "XIdigk956u0",
      },
      {
        id: "ll-p3",
        title: "Linked List Cycle",
        difficulty: "Easy",
        description:
          "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.",
        examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true",
            explanation:
              "There is a cycle where the tail connects to the 1st node.",
          },
          {
            input: "head = [1], pos = -1",
            output: "false",
            explanation: "There is no cycle in the linked list.",
          },
        ],
        constraints: [
          "The number of the nodes in the list is in the range [0, 10^4].",
          "-10^5 <= Node.val <= 10^5",
        ],
        starterCode: `function hasCycle(head) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Table", "Linked List", "Two Pointers"],
        logic: [
          "Floyd's Cycle Detection: use two pointers - slow (1 step) and fast (2 steps).",
          "If there is a cycle, fast will eventually meet slow inside the cycle.",
          "If fast reaches null, there is no cycle.",
          "Think of it like two runners on a track - the faster one will lap the slower one.",
          "Return true if they meet, false if fast hits null.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "gBTe7lFR3vc",
      },
      {
        id: "ll-p4",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        description:
          "Given the `head` of a linked list, remove the nth node from the end of the list and return its head.",
        examples: [
          { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
          { input: "head = [1], n = 1", output: "[]" },
        ],
        constraints: [
          "The number of nodes in the list is sz.",
          "1 <= sz <= 30",
          "1 <= n <= sz",
        ],
        starterCode: `function removeNthFromEnd(head, n) {\n  // Write your solution here\n  \n}`,
        tags: ["Linked List", "Two Pointers"],
        logic: [
          "Use two pointers with a gap of n between them.",
          "Advance the first pointer n steps ahead.",
          "Then move both pointers one step at a time.",
          "When the first pointer reaches the end, the second is at the node before the target.",
          "Remove the target node by adjusting the next pointer.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "XVuQxVej6y8",
      },
      {
        id: "ll-p5",
        title: "Reorder List",
        difficulty: "Medium",
        description:
          "You are given the head of a singly linked-list. The list can be represented as: L0 -> L1 -> ... -> Ln-1 -> Ln. Reorder the list to be: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...",
        examples: [
          { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
          { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" },
        ],
        constraints: [
          "The number of nodes in the list is in the range [1, 5 * 10^4].",
          "1 <= Node.val <= 1000",
        ],
        starterCode: `function reorderList(head) {\n  // Write your solution here\n  \n}`,
        tags: ["Linked List", "Two Pointers", "Stack"],
        logic: [
          "Step 1: Find the middle of the list using slow/fast pointers.",
          "Step 2: Reverse the second half of the list.",
          "Step 3: Merge the two halves alternately.",
          "First half: L0 -> L1 -> ... Second half (reversed): Ln -> Ln-1 -> ...",
          "Interleave: take one from first, one from second, repeat.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "S5bfdUTrKLM",
      },
      {
        id: "ll-p6",
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        description:
          "You are given an array of k linked-lists, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        examples: [
          {
            input: "lists = [[1,4,5],[1,3,4],[2,6]]",
            output: "[1,1,2,3,4,4,5,6]",
          },
          { input: "lists = []", output: "[]" },
        ],
        constraints: [
          "k == lists.length",
          "0 <= k <= 10^4",
          "0 <= lists[i].length <= 500",
          "-10^4 <= lists[i][j] <= 10^4",
        ],
        starterCode: `function mergeKLists(lists) {\n  // Write your solution here\n  \n}`,
        tags: ["Linked List", "Divide and Conquer", "Heap"],
        logic: [
          "Divide and Conquer: merge lists in pairs, reducing count by half each round.",
          "Merge pair of sorted lists using the merge-two-sorted-lists approach.",
          "Repeat until only one merged list remains.",
          "Alternative: use a Min Heap to always pick the smallest head across all lists.",
          "Both approaches achieve O(n log k) time complexity.",
        ],
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(log k)",
        solutionVideoId: "q5a5OiGbT6Q",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 4. STACKS & QUEUES
  // ────────────────────────────────────────────
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    description:
      "Learn LIFO and FIFO data structures, their applications, and how to use them to solve complex problems.",
    icon: "layers",
    color: "accent",
    totalProblems: 5,
    totalVideos: 2,
    videos: [
      {
        id: "sq-v1",
        title: "Stack Data Structure",
        youtubeId: "bxRVz8zklWM",
        duration: "14:20",
        description:
          "Understand the stack data structure, LIFO principle, and common operations.",
      },
      {
        id: "sq-v2",
        title: "Queue Data Structure",
        youtubeId: "D6gu-_tmEpQ",
        duration: "12:50",
        description:
          "Learn about queues, FIFO principle, and applications in BFS and task scheduling.",
      },
    ],
    problems: [
      {
        id: "sq-p1",
        title: "Valid Parentheses",
        difficulty: "Easy",
        description:
          "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
          { input: 's = "()"', output: "true" },
          { input: 's = "([)]"', output: "false" },
        ],
        constraints: [
          "1 <= s.length <= 10^4",
          "s consists of parentheses only '()[]{}'.",
        ],
        starterCode: `function isValid(s) {\n  // Write your solution here\n  \n}`,
        tags: ["String", "Stack"],
        logic: [
          "Use a stack to track opening brackets.",
          "For each character: if it is an opening bracket, push it.",
          "If it is a closing bracket, check if the stack top is the matching opening bracket.",
          "If it matches, pop the stack. If not, return false.",
          "At the end, the stack should be empty for a valid string.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "WTzjTskDFMg",
      },
      {
        id: "sq-p2",
        title: "Min Stack",
        difficulty: "Medium",
        description:
          "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        examples: [
          {
            input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
            output: "[null,null,null,null,-3,null,0,-2]",
          },
        ],
        constraints: [
          "-2^31 <= val <= 2^31 - 1",
          "Methods pop, top and getMin will always be called on non-empty stacks.",
        ],
        starterCode: `class MinStack {\n  constructor() {\n    // Initialize here\n  }\n  push(val) { }\n  pop() { }\n  top() { }\n  getMin() { }\n}`,
        tags: ["Stack", "Design"],
        logic: [
          "Maintain two stacks: a main stack and a minStack.",
          "On push: push to main stack. Push to minStack if val <= current min.",
          "On pop: pop from main stack. If popped value equals minStack top, pop minStack too.",
          "top() returns main stack's top element.",
          "getMin() returns minStack's top element - always the current minimum.",
        ],
        timeComplexity: "O(1) for all operations",
        spaceComplexity: "O(n)",
        solutionVideoId: "qkLl7nAwDPo",
      },
      {
        id: "sq-p3",
        title: "Implement Queue using Stacks",
        difficulty: "Easy",
        description:
          "Implement a first in first out (FIFO) queue using only two stacks.",
        examples: [
          {
            input: '["MyQueue","push","push","peek","pop","empty"]\n[[],[1],[2],[],[],[]]',
            output: "[null,null,null,1,1,false]",
          },
        ],
        constraints: [
          "1 <= x <= 9",
          "At most 100 calls will be made.",
        ],
        starterCode: `class MyQueue {\n  constructor() {\n    // Initialize here\n  }\n  push(x) { }\n  pop() { }\n  peek() { }\n  empty() { }\n}`,
        tags: ["Stack", "Design", "Queue"],
        logic: [
          "Use two stacks: inputStack and outputStack.",
          "push: always push to inputStack.",
          "pop/peek: if outputStack is empty, pour all elements from inputStack to outputStack (this reverses the order).",
          "Now outputStack has elements in FIFO order.",
          "Amortized O(1) for each operation over a sequence of operations.",
        ],
        timeComplexity: "O(1) amortized",
        spaceComplexity: "O(n)",
        solutionVideoId: "3Et9MrMc02Q",
      },
      {
        id: "sq-p4",
        title: "Daily Temperatures",
        difficulty: "Medium",
        description:
          "Given an array of integers `temperatures`, return an array `answer` such that `answer[i]` is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0.",
        examples: [
          {
            input: "temperatures = [73,74,75,71,69,72,76,73]",
            output: "[1,1,4,2,1,1,0,0]",
          },
          { input: "temperatures = [30,40,50,60]", output: "[1,1,1,0]" },
        ],
        constraints: [
          "1 <= temperatures.length <= 10^5",
          "30 <= temperatures[i] <= 100",
        ],
        starterCode: `function dailyTemperatures(temperatures) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Stack", "Monotonic Stack"],
        logic: [
          "Use a Monotonic Stack (decreasing) that stores indices.",
          "Iterate through temperatures. For each day:",
          "While stack is not empty and current temp > temp at stack top, pop the index.",
          "The difference between current index and popped index is the answer for that day.",
          "Push current index to the stack.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "cTBiBSnjO3c",
      },
      {
        id: "sq-p5",
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        description:
          "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
        examples: [
          {
            input: "heights = [2,1,5,6,2,3]",
            output: "10",
            explanation: "The largest rectangle has area = 10 (height=5, width=2).",
          },
          { input: "heights = [2,4]", output: "4" },
        ],
        constraints: [
          "1 <= heights.length <= 10^5",
          "0 <= heights[i] <= 10^4",
        ],
        starterCode: `function largestRectangleArea(heights) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Stack", "Monotonic Stack"],
        logic: [
          "Use a stack to keep indices of bars in increasing height order.",
          "For each bar, if it is shorter than the bar at stack top, pop and calculate area.",
          "Width = current index - stack top - 1 (or current index if stack is empty).",
          "Height = heights[popped index]. Area = height * width.",
          "Process remaining bars in the stack after the loop ends.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "zx5Sw9130L0",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 5. TREES
  // ────────────────────────────────────────────
  {
    id: "trees",
    title: "Trees",
    description:
      "Explore binary trees, BSTs, tree traversals, and recursive problem-solving techniques.",
    icon: "git-branch",
    color: "primary",
    totalProblems: 6,
    totalVideos: 2,
    videos: [
      {
        id: "tree-v1",
        title: "Binary Tree Fundamentals",
        youtubeId: "fAAZixBzIAI",
        duration: "23:10",
        description:
          "Learn about binary trees, tree terminology, and the three types of traversals: inorder, preorder, and postorder.",
      },
      {
        id: "tree-v2",
        title: "Binary Search Trees",
        youtubeId: "cySVml6e_Fc",
        duration: "20:30",
        description:
          "Understand BST properties, insertion, deletion, and how to leverage BST ordering for efficient search.",
      },
    ],
    problems: [
      {
        id: "tree-p1",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        description:
          "Given the `root` of a binary tree, return its maximum depth.",
        examples: [
          { input: "root = [3,9,20,null,null,15,7]", output: "3" },
          { input: "root = [1,null,2]", output: "2" },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 10^4].",
          "-100 <= Node.val <= 100",
        ],
        starterCode: `function maxDepth(root) {\n  // Write your solution here\n  \n}`,
        tags: ["Tree", "DFS", "BFS", "Binary Tree"],
        logic: [
          "Base case: if root is null, return 0 (no depth).",
          "Recursively find the depth of the left subtree.",
          "Recursively find the depth of the right subtree.",
          "Return 1 + max(leftDepth, rightDepth).",
          "The +1 accounts for the current node.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) where h = tree height",
        solutionVideoId: "hTM3phVI6YQ",
      },
      {
        id: "tree-p2",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        description:
          "Given the `root` of a binary tree, invert the tree, and return its root.",
        examples: [
          { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
          { input: "root = [2,1,3]", output: "[2,3,1]" },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 100].",
          "-100 <= Node.val <= 100",
        ],
        starterCode: `function invertTree(root) {\n  // Write your solution here\n  \n}`,
        tags: ["Tree", "DFS", "BFS", "Binary Tree"],
        logic: [
          "Base case: if root is null, return null.",
          "Swap the left and right children of the current node.",
          "Recursively invert the left subtree.",
          "Recursively invert the right subtree.",
          "Return the root.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        solutionVideoId: "OnSn2XEQ4MY",
      },
      {
        id: "tree-p3",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        description:
          "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).",
        examples: [
          { input: "root = [2,1,3]", output: "true" },
          {
            input: "root = [5,1,4,null,null,3,6]",
            output: "false",
            explanation: "The root's right child's value is 4, which is less than 5.",
          },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [1, 10^4].",
          "-2^31 <= Node.val <= 2^31 - 1",
        ],
        starterCode: `function isValidBST(root) {\n  // Write your solution here\n  \n}`,
        tags: ["Tree", "DFS", "BST", "Binary Tree"],
        logic: [
          "Each node must be within a valid range: (min, max).",
          "Root starts with range (-Infinity, +Infinity).",
          "For left child: upper bound becomes parent's value.",
          "For right child: lower bound becomes parent's value.",
          "Recursively validate: if any node violates its range, return false.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        solutionVideoId: "s6ATEkipzow",
      },
      {
        id: "tree-p4",
        title: "Level Order Traversal",
        difficulty: "Medium",
        description:
          "Given the `root` of a binary tree, return the level order traversal of its nodes' values (left to right, level by level).",
        examples: [
          { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
          { input: "root = [1]", output: "[[1]]" },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 2000].",
          "-1000 <= Node.val <= 1000",
        ],
        starterCode: `function levelOrder(root) {\n  // Write your solution here\n  \n}`,
        tags: ["Tree", "BFS", "Binary Tree"],
        logic: [
          "Use BFS with a queue, starting with the root node.",
          "At each level, record the number of nodes (queue size).",
          "Process all nodes at the current level and add their values to a level array.",
          "Enqueue children of each processed node.",
          "Add the level array to the result after processing each level.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "6ZnyEApgFYg",
      },
      {
        id: "tree-p5",
        title: "Lowest Common Ancestor of a BST",
        difficulty: "Medium",
        description:
          "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.",
        examples: [
          {
            input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
            output: "6",
            explanation: "The LCA of 2 and 8 is 6.",
          },
          {
            input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
            output: "2",
          },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [2, 10^5].",
          "All Node.val are unique.",
          "p != q, p and q exist in the BST.",
        ],
        starterCode: `function lowestCommonAncestor(root, p, q) {\n  // Write your solution here\n  \n}`,
        tags: ["Tree", "DFS", "BST"],
        logic: [
          "Leverage BST property: left < root < right.",
          "If both p and q are less than root, LCA is in the left subtree.",
          "If both p and q are greater than root, LCA is in the right subtree.",
          "Otherwise, the current root is the split point - it is the LCA.",
          "This works because once they split into different subtrees, the current node is their LCA.",
        ],
        timeComplexity: "O(h)",
        spaceComplexity: "O(1) iterative / O(h) recursive",
        solutionVideoId: "gs2LMfuOR9k",
      },
      {
        id: "tree-p6",
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        description:
          "Design an algorithm to serialize and deserialize a binary tree. Serialization is converting a tree to a string so that it can be stored. Deserialization reconstructs the tree from the string.",
        examples: [
          { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" },
          { input: "root = []", output: "[]" },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 10^4].",
          "-1000 <= Node.val <= 1000",
        ],
        starterCode: `function serialize(root) {\n  // Encodes a tree to a string\n}\n\nfunction deserialize(data) {\n  // Decodes a string to a tree\n}`,
        tags: ["Tree", "DFS", "BFS", "Design"],
        logic: [
          "Serialize: Use preorder traversal (DFS), recording 'null' for missing nodes.",
          "Join values with a delimiter (e.g., comma).",
          "Deserialize: Split the string and use a queue/index to reconstruct.",
          "Recursively build: take the next value. If 'null', return null.",
          "Otherwise, create a node and recursively build left and right subtrees.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "u4JAi2JJhI8",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 6. DYNAMIC PROGRAMMING
  // ────────────────────────────────────────────
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Master memoization, tabulation, and common DP patterns like knapsack, LCS, and coin change.",
    icon: "brain",
    color: "accent",
    totalProblems: 6,
    totalVideos: 2,
    videos: [
      {
        id: "dp-v1",
        title: "Introduction to Dynamic Programming",
        youtubeId: "oBt53YbR9Kk",
        duration: "30:00",
        description:
          "Understand the core concepts: overlapping subproblems, optimal substructure, memoization and tabulation.",
      },
      {
        id: "dp-v2",
        title: "Common DP Patterns",
        youtubeId: "nqowUJzG-iM",
        duration: "28:15",
        description:
          "Learn 1D DP, 2D DP, and how to recognize which pattern to use for different problems.",
      },
    ],
    problems: [
      {
        id: "dp-p1",
        title: "Climbing Stairs",
        difficulty: "Easy",
        description:
          "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
          { input: "n = 2", output: "2", explanation: "1+1 or 2." },
          { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1." },
        ],
        constraints: ["1 <= n <= 45"],
        starterCode: `function climbStairs(n) {\n  // Write your solution here\n  \n}`,
        tags: ["Math", "Dynamic Programming", "Memoization"],
        logic: [
          "This is essentially the Fibonacci sequence.",
          "ways(n) = ways(n-1) + ways(n-2) because from step n you could have come from n-1 or n-2.",
          "Base cases: ways(1) = 1, ways(2) = 2.",
          "Use tabulation: iterate from 3 to n, computing each value.",
          "Only need two variables (prev1, prev2) to save space.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "Y0lT9Fck7qI",
      },
      {
        id: "dp-p2",
        title: "Coin Change",
        difficulty: "Medium",
        description:
          "Given an integer array `coins` and an integer `amount`, return the fewest number of coins needed to make up that amount. If not possible, return -1.",
        examples: [
          { input: "coins = [1,5,11], amount = 11", output: "1", explanation: "11 = 11" },
          { input: "coins = [2], amount = 3", output: "-1" },
        ],
        constraints: [
          "1 <= coins.length <= 12",
          "1 <= coins[i] <= 2^31 - 1",
          "0 <= amount <= 10^4",
        ],
        starterCode: `function coinChange(coins, amount) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Dynamic Programming", "BFS"],
        logic: [
          "Create a DP array of size amount+1, initialized to Infinity. dp[0] = 0.",
          "dp[i] represents the minimum coins needed to make amount i.",
          "For each amount from 1 to target: try every coin.",
          "dp[i] = min(dp[i], dp[i - coin] + 1) for each valid coin.",
          "If dp[amount] is still Infinity, return -1; otherwise return dp[amount].",
        ],
        timeComplexity: "O(amount * coins.length)",
        spaceComplexity: "O(amount)",
        solutionVideoId: "H9bfqozjoqs",
      },
      {
        id: "dp-p3",
        title: "House Robber",
        difficulty: "Medium",
        description:
          "You are a professional robber. Each house has money stashed. Adjacent houses have connected security. Return the maximum amount you can rob without triggering alarms.",
        examples: [
          {
            input: "nums = [1,2,3,1]",
            output: "4",
            explanation: "Rob house 1 + house 3 = 1 + 3 = 4.",
          },
          {
            input: "nums = [2,7,9,3,1]",
            output: "12",
            explanation: "Rob house 1 + 3 + 5 = 2 + 9 + 1 = 12.",
          },
        ],
        constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
        starterCode: `function rob(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Dynamic Programming"],
        logic: [
          "At each house, two choices: rob it (skip previous) or skip it (keep previous max).",
          "dp[i] = max(dp[i-1], dp[i-2] + nums[i]).",
          "dp[i-1] = best without current house, dp[i-2] + nums[i] = best with current house.",
          "Base cases: dp[0] = nums[0], dp[1] = max(nums[0], nums[1]).",
          "Optimize space: only need two variables (prev1, prev2).",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "73r3KWiEvyk",
      },
      {
        id: "dp-p4",
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        description:
          "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
        examples: [
          {
            input: "nums = [10,9,2,5,3,7,101,18]",
            output: "4",
            explanation: "The LIS is [2,3,7,101].",
          },
          { input: "nums = [0,1,0,3,2,3]", output: "4" },
        ],
        constraints: [
          "1 <= nums.length <= 2500",
          "-10^4 <= nums[i] <= 10^4",
        ],
        starterCode: `function lengthOfLIS(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Binary Search", "Dynamic Programming"],
        logic: [
          "DP approach: dp[i] = length of LIS ending at index i.",
          "For each i, check all j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1).",
          "Initialize all dp[i] = 1 (each element is a subsequence of length 1).",
          "Return the maximum value in the dp array.",
          "Optimized: use binary search with a 'tails' array for O(n log n).",
        ],
        timeComplexity: "O(n^2) DP / O(n log n) optimized",
        spaceComplexity: "O(n)",
        solutionVideoId: "cjWnW0hdF1Y",
      },
      {
        id: "dp-p5",
        title: "Unique Paths",
        difficulty: "Medium",
        description:
          "There is a robot on an m x n grid. The robot starts at the top-left corner and can only move right or down. How many unique paths are there to reach the bottom-right corner?",
        examples: [
          { input: "m = 3, n = 7", output: "28" },
          { input: "m = 3, n = 2", output: "3" },
        ],
        constraints: ["1 <= m, n <= 100"],
        starterCode: `function uniquePaths(m, n) {\n  // Write your solution here\n  \n}`,
        tags: ["Math", "Dynamic Programming", "Combinatorics"],
        logic: [
          "dp[i][j] = number of ways to reach cell (i, j).",
          "You can only come from the cell above or the cell to the left.",
          "dp[i][j] = dp[i-1][j] + dp[i][j-1].",
          "First row and first column are all 1s (only one way to reach them).",
          "Optimize: use a 1D array since each row only depends on the previous row.",
        ],
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "IlEsdxuD4lY",
      },
      {
        id: "dp-p6",
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        description:
          "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
        examples: [
          {
            input: 'text1 = "abcde", text2 = "ace"',
            output: "3",
            explanation: 'The longest common subsequence is "ace".',
          },
          { input: 'text1 = "abc", text2 = "def"', output: "0" },
        ],
        constraints: [
          "1 <= text1.length, text2.length <= 1000",
          "text1 and text2 consist of only lowercase English characters.",
        ],
        starterCode: `function longestCommonSubsequence(text1, text2) {\n  // Write your solution here\n  \n}`,
        tags: ["String", "Dynamic Programming"],
        logic: [
          "2D DP: dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1].",
          "If text1[i-1] == text2[j-1], dp[i][j] = dp[i-1][j-1] + 1.",
          "Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
          "Build the table bottom-up, row by row.",
          "Answer is dp[m][n] where m, n are lengths of text1, text2.",
        ],
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)",
        solutionVideoId: "Ua0GhsJSlWM",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 7. BINARY SEARCH
  // ────────────────────────────────────────────
  {
    id: "binary-search",
    title: "Binary Search",
    description:
      "Master the binary search algorithm and its variations for searching in sorted arrays, rotated arrays, and answer spaces.",
    icon: "search",
    color: "primary",
    totalProblems: 5,
    totalVideos: 2,
    videos: [
      {
        id: "bs-v1",
        title: "Binary Search Fundamentals",
        youtubeId: "s4DPM8ct1pI",
        duration: "18:20",
        description:
          "Learn the core binary search algorithm, its invariants, and how to correctly handle edge cases with left/right pointers.",
      },
      {
        id: "bs-v2",
        title: "Advanced Binary Search Patterns",
        youtubeId: "W9QJ8HaRvJQ",
        duration: "22:00",
        description:
          "Explore advanced patterns: binary search on answer, rotated arrays, and finding boundaries.",
      },
    ],
    problems: [
      {
        id: "bs-p1",
        title: "Binary Search",
        difficulty: "Easy",
        description:
          "Given a sorted array of integers `nums` and a target value `target`, return the index of target if found, otherwise return -1. You must write an algorithm with O(log n) runtime.",
        examples: [
          { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
          { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
        ],
        constraints: [
          "1 <= nums.length <= 10^4",
          "nums is sorted in ascending order.",
          "-10^4 < nums[i], target < 10^4",
          "All integers in nums are unique.",
        ],
        starterCode: `function search(nums, target) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Binary Search"],
        logic: [
          "Set left = 0, right = nums.length - 1.",
          "While left <= right, compute mid = Math.floor((left + right) / 2).",
          "If nums[mid] === target, return mid.",
          "If nums[mid] < target, search right half: left = mid + 1.",
          "If nums[mid] > target, search left half: right = mid - 1.",
        ],
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "s4DPM8ct1pI",
      },
      {
        id: "bs-p2",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        description:
          "Given a rotated sorted array `nums` and a `target`, return the index of target or -1. The array was originally sorted in ascending order then rotated at some pivot.",
        examples: [
          { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
          { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" },
        ],
        constraints: [
          "1 <= nums.length <= 5000",
          "-10^4 <= nums[i] <= 10^4",
          "All values of nums are unique.",
        ],
        starterCode: `function search(nums, target) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Binary Search"],
        logic: [
          "Use binary search but determine which half is sorted.",
          "If nums[left] <= nums[mid], left half is sorted.",
          "Check if target lies in the sorted half; if yes, search there.",
          "Otherwise, search the other half.",
          "Repeat until found or pointers cross.",
        ],
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "U8XENwh8Oy8",
      },
      {
        id: "bs-p3",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        description:
          "Given a sorted rotated array of unique elements, return the minimum element. You must write an algorithm that runs in O(log n) time.",
        examples: [
          { input: "nums = [3,4,5,1,2]", output: "1" },
          { input: "nums = [4,5,6,7,0,1,2]", output: "0" },
        ],
        constraints: [
          "n == nums.length",
          "1 <= n <= 5000",
          "-5000 <= nums[i] <= 5000",
          "All integers are unique.",
        ],
        starterCode: `function findMin(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Binary Search"],
        logic: [
          "The minimum is at the inflection point where the order breaks.",
          "If nums[mid] > nums[right], the min is in the right half: left = mid + 1.",
          "Otherwise, the min is in the left half (including mid): right = mid.",
          "When left === right, we found the minimum.",
          "Key insight: compare mid with right (not left) to determine which half has the min.",
        ],
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "nIVW4P8b1VA",
      },
      {
        id: "bs-p4",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        description:
          "Koko loves bananas. There are `n` piles. The guards will return in `h` hours. Koko can decide her eating speed `k` (bananas per hour). Each hour she picks a pile and eats k bananas. If the pile has less than k, she eats it all and won't eat more. Return the minimum integer k such that she can eat all bananas within h hours.",
        examples: [
          { input: "piles = [3,6,7,11], h = 8", output: "4" },
          { input: "piles = [30,11,23,4,20], h = 5", output: "30" },
        ],
        constraints: [
          "1 <= piles.length <= 10^4",
          "piles.length <= h <= 10^9",
          "1 <= piles[i] <= 10^9",
        ],
        starterCode: `function minEatingSpeed(piles, h) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Binary Search"],
        logic: [
          "Binary search on the answer (eating speed k).",
          "Range: left = 1, right = max(piles).",
          "For each mid speed, calculate total hours needed: sum of ceil(pile / mid) for each pile.",
          "If total hours <= h, this speed works - try smaller: right = mid.",
          "If total hours > h, speed is too slow - go higher: left = mid + 1.",
        ],
        timeComplexity: "O(n * log(max(piles)))",
        spaceComplexity: "O(1)",
        solutionVideoId: "U2SozAs9RzA",
      },
      {
        id: "bs-p5",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        description:
          "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
        examples: [
          {
            input: "nums1 = [1,3], nums2 = [2]",
            output: "2.0",
            explanation: "Merged array = [1,2,3] and median is 2.",
          },
          {
            input: "nums1 = [1,2], nums2 = [3,4]",
            output: "2.5",
            explanation: "Merged array = [1,2,3,4] and median is (2+3)/2 = 2.5.",
          },
        ],
        constraints: [
          "nums1.length == m, nums2.length == n",
          "0 <= m <= 1000, 0 <= n <= 1000",
          "1 <= m + n <= 2000",
        ],
        starterCode: `function findMedianSortedArrays(nums1, nums2) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        logic: [
          "Binary search on the smaller array to find the correct partition.",
          "Partition both arrays so that left half has (m+n+1)/2 elements total.",
          "Ensure maxLeftA <= minRightB and maxLeftB <= minRightA.",
          "If maxLeftA > minRightB, move partition left. If maxLeftB > minRightA, move right.",
          "When valid partition found, median = average of max(left parts) and min(right parts).",
        ],
        timeComplexity: "O(log(min(m, n)))",
        spaceComplexity: "O(1)",
        solutionVideoId: "q6IEA26hvXc",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 8. GRAPHS
  // ────────────────────────────────────────────
  {
    id: "graphs",
    title: "Graphs",
    description:
      "Learn graph representations, traversals (BFS/DFS), shortest paths, topological sorting, and union-find.",
    icon: "network",
    color: "accent",
    totalProblems: 5,
    totalVideos: 3,
    videos: [
      {
        id: "graph-v1",
        title: "Graph Theory Introduction",
        youtubeId: "tWVWeAqZ0WU",
        duration: "25:40",
        description:
          "Learn graph terminology, representations (adjacency list/matrix), and when to use each.",
      },
      {
        id: "graph-v2",
        title: "BFS and DFS Traversals",
        youtubeId: "pcKY4hjDrxk",
        duration: "20:30",
        description:
          "Master Breadth-First Search and Depth-First Search on graphs with practical examples.",
      },
      {
        id: "graph-v3",
        title: "Topological Sort & Shortest Paths",
        youtubeId: "eL-KzMXSXXI",
        duration: "28:00",
        description:
          "Learn topological ordering for DAGs and shortest path algorithms like Dijkstra's.",
      },
    ],
    problems: [
      {
        id: "graph-p1",
        title: "Number of Islands",
        difficulty: "Medium",
        description:
          "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
        examples: [
          {
            input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
            output: "3",
          },
        ],
        constraints: [
          "m == grid.length, n == grid[i].length",
          "1 <= m, n <= 300",
          "grid[i][j] is '0' or '1'.",
        ],
        starterCode: `function numIslands(grid) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "DFS", "BFS", "Graph"],
        logic: [
          "Iterate through every cell in the grid.",
          "When you find a '1', increment the island count and start a DFS/BFS from that cell.",
          "Mark all connected '1's as visited (change to '0' or use a visited set).",
          "The DFS/BFS explores all 4 directions (up, down, left, right).",
          "Each DFS/BFS call discovers one complete island.",
        ],
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n) worst case for DFS stack",
        solutionVideoId: "pV2kpPD66nE",
      },
      {
        id: "graph-p2",
        title: "Clone Graph",
        difficulty: "Medium",
        description:
          "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of its neighbors.",
        examples: [
          {
            input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
            output: "[[2,4],[1,3],[2,4],[1,3]]",
          },
        ],
        constraints: [
          "The number of nodes is in the range [0, 100].",
          "1 <= Node.val <= 100",
          "There are no repeated edges and no self-loops.",
        ],
        starterCode: `function cloneGraph(node) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Table", "DFS", "BFS", "Graph"],
        logic: [
          "Use a HashMap to map original nodes to their clones.",
          "Start DFS/BFS from the given node.",
          "For each node: create a clone if not already created.",
          "For each neighbor: recursively clone it and add to the current clone's neighbors.",
          "The HashMap prevents revisiting and infinite loops.",
        ],
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        solutionVideoId: "mQeF6bN8hMk",
      },
      {
        id: "graph-p3",
        title: "Course Schedule",
        difficulty: "Medium",
        description:
          "There are a total of numCourses courses labeled from 0 to numCourses-1. Some courses have prerequisites. Given the total number and a list of prerequisite pairs, determine if it is possible to finish all courses.",
        examples: [
          {
            input: "numCourses = 2, prerequisites = [[1,0]]",
            output: "true",
            explanation: "Take course 0 first, then course 1.",
          },
          {
            input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
            output: "false",
            explanation: "Circular dependency makes it impossible.",
          },
        ],
        constraints: [
          "1 <= numCourses <= 2000",
          "0 <= prerequisites.length <= 5000",
        ],
        starterCode: `function canFinish(numCourses, prerequisites) {\n  // Write your solution here\n  \n}`,
        tags: ["DFS", "BFS", "Graph", "Topological Sort"],
        logic: [
          "This is a cycle detection problem in a directed graph.",
          "Build an adjacency list from prerequisites.",
          "Use topological sort (Kahn's algorithm): compute in-degrees for all nodes.",
          "Add all nodes with in-degree 0 to a queue. Process each, reducing neighbors' in-degrees.",
          "If all nodes are processed, no cycle exists - return true. Otherwise false.",
        ],
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
        solutionVideoId: "EgI5nU9etnU",
      },
      {
        id: "graph-p4",
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        description:
          "There is an m x n island with the Pacific ocean on the top and left edges, and the Atlantic on the bottom and right. Water flows to neighboring cells with equal or lower height. Return coordinates of cells where water can flow to both oceans.",
        examples: [
          {
            input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
            output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
          },
        ],
        constraints: [
          "m == heights.length, n == heights[i].length",
          "1 <= m, n <= 200",
          "0 <= heights[i][j] <= 10^5",
        ],
        starterCode: `function pacificAtlantic(heights) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "DFS", "BFS", "Graph"],
        logic: [
          "Reverse thinking: instead of flowing water down, flow it uphill from the oceans.",
          "Do BFS/DFS from all Pacific border cells (top row + left column).",
          "Do BFS/DFS from all Atlantic border cells (bottom row + right column).",
          "Mark cells reachable from each ocean.",
          "Return cells that are reachable from both oceans (intersection).",
        ],
        timeComplexity: "O(m * n)",
        spaceComplexity: "O(m * n)",
        solutionVideoId: "s-VkcjHqkGI",
      },
      {
        id: "graph-p5",
        title: "Word Ladder",
        difficulty: "Hard",
        description:
          "Given two words beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord. Each transformation changes only one letter and each intermediate word must exist in wordList. Return 0 if no such sequence exists.",
        examples: [
          {
            input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
            output: "5",
            explanation: "hit -> hot -> dot -> dog -> cog",
          },
        ],
        constraints: [
          "1 <= beginWord.length <= 10",
          "endWord.length == beginWord.length",
          "1 <= wordList.length <= 5000",
        ],
        starterCode: `function ladderLength(beginWord, endWord, wordList) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Table", "String", "BFS", "Graph"],
        logic: [
          "This is a shortest path problem - use BFS.",
          "Each word is a node; edges connect words differing by one letter.",
          "Start BFS from beginWord, exploring all single-letter transformations.",
          "Use a Set for wordList for O(1) lookup. Remove visited words.",
          "Return the level (distance) when endWord is found, or 0 if queue is exhausted.",
        ],
        timeComplexity: "O(M^2 * N) where M = word length, N = list size",
        spaceComplexity: "O(M^2 * N)",
        solutionVideoId: "h9iTnkgv05E",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 9. HASHING
  // ────────────────────────────────────────────
  {
    id: "hashing",
    title: "Hashing",
    description:
      "Understand hash maps and hash sets, collision handling, and how hashing enables O(1) lookups for frequency counting and caching.",
    icon: "hash",
    color: "primary",
    totalProblems: 5,
    totalVideos: 2,
    videos: [
      {
        id: "hash-v1",
        title: "Hash Table Fundamentals",
        youtubeId: "jalSiaIi8j4",
        duration: "16:30",
        description:
          "Learn how hash tables work internally, hashing functions, collision resolution, and Big-O analysis.",
      },
      {
        id: "hash-v2",
        title: "HashMap Patterns in Interviews",
        youtubeId: "dRUpbt8vHpo",
        duration: "20:15",
        description:
          "Master common HashMap patterns: frequency counting, grouping, caching, and two-sum style problems.",
      },
    ],
    problems: [
      {
        id: "hash-p1",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        description:
          "Given an integer array `nums` and an integer `k`, return the k most frequent elements. You may return the answer in any order.",
        examples: [
          { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
          { input: "nums = [1], k = 1", output: "[1]" },
        ],
        constraints: [
          "1 <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4",
          "k is in the range [1, the number of unique elements].",
        ],
        starterCode: `function topKFrequent(nums, k) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Hash Table", "Sorting", "Heap"],
        logic: [
          "Step 1: Build a frequency map using a HashMap.",
          "Step 2: Use Bucket Sort - create an array of size n+1 where index = frequency.",
          "Place each number into the bucket matching its frequency.",
          "Iterate buckets from highest to lowest, collecting elements until we have k.",
          "This avoids sorting and achieves O(n) time complexity.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "YPTqKIgVk-k",
      },
      {
        id: "hash-p2",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        description:
          "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
        examples: [
          {
            input: "nums = [100,4,200,1,3,2]",
            output: "4",
            explanation: "The longest consecutive sequence is [1,2,3,4].",
          },
        ],
        constraints: [
          "0 <= nums.length <= 10^5",
          "-10^9 <= nums[i] <= 10^9",
        ],
        starterCode: `function longestConsecutive(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Hash Table", "Union Find"],
        logic: [
          "Put all numbers in a HashSet for O(1) lookup.",
          "For each number, check if it is the START of a sequence (num - 1 not in set).",
          "If it is a start, count consecutive numbers: num, num+1, num+2, ... until not found.",
          "Track the maximum sequence length.",
          "Only starting from sequence beginnings ensures O(n) total work.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "P6RZZMu_maU",
      },
      {
        id: "hash-p3",
        title: "Subarray Sum Equals K",
        difficulty: "Medium",
        description:
          "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.",
        examples: [
          { input: "nums = [1,1,1], k = 2", output: "2" },
          { input: "nums = [1,2,3], k = 3", output: "2" },
        ],
        constraints: [
          "1 <= nums.length <= 2 * 10^4",
          "-1000 <= nums[i] <= 1000",
          "-10^7 <= k <= 10^7",
        ],
        starterCode: `function subarraySum(nums, k) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Hash Table", "Prefix Sum"],
        logic: [
          "Use prefix sum + HashMap approach.",
          "Maintain a running prefix sum and a map of {prefixSum: count}.",
          "At each index, check if (prefixSum - k) exists in the map.",
          "If it does, add its count to the result (those many subarrays sum to k).",
          "Add current prefixSum to the map. Initialize map with {0: 1}.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "fFVZt-6sgyo",
      },
      {
        id: "hash-p4",
        title: "Encode and Decode Strings",
        difficulty: "Medium",
        description:
          "Design an algorithm to encode a list of strings to a single string and decode it back. The encoded string should be transferable over a network and decodable back to the original list.",
        examples: [
          {
            input: '["Hello","World"]',
            output: '["Hello","World"]',
            explanation: "The algorithm must encode and decode correctly.",
          },
        ],
        constraints: [
          "0 <= strs.length < 100",
          "0 <= strs[i].length < 200",
          "strs[i] contains any possible characters.",
        ],
        starterCode: `function encode(strs) {\n  // Encode list of strings to a single string\n}\n\nfunction decode(s) {\n  // Decode back to list of strings\n}`,
        tags: ["Array", "Hash Table", "String", "Design"],
        logic: [
          "Use length-prefixed encoding: for each string, store its length + a delimiter + the string.",
          "Format: '5#Hello5#World' where number is the length and # is the delimiter.",
          "To decode: read the number before #, then read that many characters as the string.",
          "This handles any characters (including #) inside the strings safely.",
          "No ambiguity because the length tells you exactly how many characters to read.",
        ],
        timeComplexity: "O(n) where n = total characters",
        spaceComplexity: "O(1) extra",
        solutionVideoId: "B1k_sxOSgv8",
      },
      {
        id: "hash-p5",
        title: "LRU Cache",
        difficulty: "Hard",
        description:
          "Design a data structure that follows the Least Recently Used (LRU) cache constraints. Implement the LRUCache class with get and put operations, both in O(1) time.",
        examples: [
          {
            input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
            output: "[null,null,null,1,null,-1,null,-1,3,4]",
          },
        ],
        constraints: [
          "1 <= capacity <= 3000",
          "0 <= key <= 10^4",
          "0 <= value <= 10^5",
          "At most 2 * 10^5 calls to get and put.",
        ],
        starterCode: `class LRUCache {\n  constructor(capacity) {\n    // Initialize here\n  }\n  get(key) { }\n  put(key, value) { }\n}`,
        tags: ["Hash Table", "Linked List", "Design"],
        logic: [
          "Use a HashMap + Doubly Linked List for O(1) operations.",
          "HashMap maps key -> node in the linked list.",
          "Linked list maintains usage order: most recent at head, least recent at tail.",
          "get: find node in map, move to head, return value.",
          "put: if exists, update and move to head. If new, add to head. If over capacity, remove tail.",
        ],
        timeComplexity: "O(1) for get and put",
        spaceComplexity: "O(capacity)",
        solutionVideoId: "7ABFKPK2hD4",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 10. HEAP / PRIORITY QUEUE
  // ────────────────────────────────────────────
  {
    id: "heap",
    title: "Heap / Priority Queue",
    description:
      "Learn min-heaps, max-heaps, and priority queues for efficiently finding top-K elements and scheduling problems.",
    icon: "arrow-up-down",
    color: "accent",
    totalProblems: 4,
    totalVideos: 2,
    videos: [
      {
        id: "heap-v1",
        title: "Heap Data Structure Explained",
        youtubeId: "t0Cq6tVNRBA",
        duration: "22:15",
        description:
          "Understand how heaps work, the complete binary tree property, heapify operations, and building a heap.",
      },
      {
        id: "heap-v2",
        title: "Priority Queue Applications",
        youtubeId: "HqPJF2L5h9U",
        duration: "18:40",
        description:
          "Explore real-world applications of priority queues in scheduling, graph algorithms, and top-K problems.",
      },
    ],
    problems: [
      {
        id: "heap-p1",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        description:
          "Given an integer array `nums` and an integer `k`, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.",
        examples: [
          { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
          { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" },
        ],
        constraints: [
          "1 <= k <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4",
        ],
        starterCode: `function findKthLargest(nums, k) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Heap", "Sorting", "Divide and Conquer"],
        logic: [
          "Use a Min Heap of size k.",
          "Add elements to the heap. When heap size exceeds k, remove the minimum.",
          "After processing all elements, the heap top is the kth largest.",
          "Alternatively, use Quickselect (partition-based) for average O(n).",
          "The heap approach guarantees O(n log k) time.",
        ],
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(k)",
        solutionVideoId: "XEmy13g1Qxc",
      },
      {
        id: "heap-p2",
        title: "Last Stone Weight",
        difficulty: "Easy",
        description:
          "You have a collection of stones, each with a positive integer weight. Each turn, you choose the two heaviest stones and smash them. If they are equal, both are destroyed. If not, the lighter is destroyed and the heavier loses weight equal to the lighter. Return the weight of the last remaining stone, or 0 if none remain.",
        examples: [
          {
            input: "stones = [2,7,4,1,8,1]",
            output: "1",
            explanation: "8 vs 7 -> 1, then 4 vs 2 -> 2, then 2 vs 1 -> 1, then 1 vs 1 -> 0, last = 1.",
          },
        ],
        constraints: [
          "1 <= stones.length <= 30",
          "1 <= stones[i] <= 1000",
        ],
        starterCode: `function lastStoneWeight(stones) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Heap"],
        logic: [
          "Use a Max Heap to always access the two heaviest stones.",
          "Pop the two largest stones from the heap.",
          "If they differ, push the difference back into the heap.",
          "Repeat until 0 or 1 stone remains.",
          "Return the remaining stone's weight, or 0 if the heap is empty.",
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "B-QCq79-Vfw",
      },
      {
        id: "heap-p3",
        title: "Task Scheduler",
        difficulty: "Medium",
        description:
          "Given a characters array `tasks` representing tasks a CPU needs to do, and a non-negative integer `n` representing the cooldown interval between same tasks, return the minimum number of intervals the CPU will take to finish all tasks.",
        examples: [
          {
            input: 'tasks = ["A","A","A","B","B","B"], n = 2',
            output: "8",
            explanation: "A -> B -> idle -> A -> B -> idle -> A -> B",
          },
        ],
        constraints: [
          "1 <= tasks.length <= 10^4",
          "tasks[i] is an upper-case English letter.",
          "0 <= n <= 100",
        ],
        starterCode: `function leastInterval(tasks, n) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Hash Table", "Heap", "Greedy"],
        logic: [
          "Count frequency of each task. The most frequent task determines the structure.",
          "Create (maxFreq - 1) groups of size (n + 1), plus a final group for tasks with maxFreq.",
          "Result = (maxFreq - 1) * (n + 1) + countOfMaxFreqTasks.",
          "If tasks fill all idle slots, result = tasks.length.",
          "Return max of the two calculations.",
        ],
        timeComplexity: "O(n) where n = tasks.length",
        spaceComplexity: "O(1) - at most 26 chars",
        solutionVideoId: "s8p8ukTyA2I",
      },
      {
        id: "heap-p4",
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        description:
          "The median is the middle value in an ordered integer list. Design a data structure that supports addNum(int num) and findMedian() efficiently.",
        examples: [
          {
            input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]',
            output: "[null,null,null,1.5,null,2.0]",
          },
        ],
        constraints: [
          "-10^5 <= num <= 10^5",
          "findMedian will only be called after addNum.",
          "At most 5 * 10^4 calls.",
        ],
        starterCode: `class MedianFinder {\n  constructor() {\n    // Initialize here\n  }\n  addNum(num) { }\n  findMedian() { }\n}`,
        tags: ["Two Pointers", "Design", "Heap", "Sorting"],
        logic: [
          "Use two heaps: a Max Heap for the lower half and a Min Heap for the upper half.",
          "Max Heap stores the smaller half, Min Heap stores the larger half.",
          "addNum: add to Max Heap first, then balance by moving top to Min Heap if needed.",
          "Keep sizes balanced: maxHeap.size can be equal to or one more than minHeap.size.",
          "findMedian: if sizes equal, average of both tops. Otherwise, maxHeap top.",
        ],
        timeComplexity: "O(log n) add, O(1) find",
        spaceComplexity: "O(n)",
        solutionVideoId: "itmhHWaHupI",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 11. RECURSION & BACKTRACKING
  // ────────────────────────────────────────────
  {
    id: "recursion-backtracking",
    title: "Recursion & Backtracking",
    description:
      "Learn recursive thinking, backtracking patterns, and how to generate permutations, combinations, and subsets.",
    icon: "repeat",
    color: "primary",
    totalProblems: 5,
    totalVideos: 2,
    videos: [
      {
        id: "rb-v1",
        title: "Recursion Fundamentals",
        youtubeId: "IJDJ0kBx2LM",
        duration: "20:00",
        description:
          "Understand recursion, base cases, recursive calls, call stack, and how to think recursively.",
      },
      {
        id: "rb-v2",
        title: "Backtracking Patterns",
        youtubeId: "A80YzvNwqXA",
        duration: "26:30",
        description:
          "Master the backtracking template for generating permutations, combinations, subsets, and solving constraint problems.",
      },
    ],
    problems: [
      {
        id: "rb-p1",
        title: "Subsets",
        difficulty: "Medium",
        description:
          "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
        examples: [
          {
            input: "nums = [1,2,3]",
            output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
          },
          { input: "nums = [0]", output: "[[],[0]]" },
        ],
        constraints: [
          "1 <= nums.length <= 10",
          "-10 <= nums[i] <= 10",
          "All elements are unique.",
        ],
        starterCode: `function subsets(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Backtracking", "Bit Manipulation"],
        logic: [
          "Use backtracking: at each index, choose to include or exclude the current element.",
          "Maintain a current subset and add a copy to results at each recursion level.",
          "Start from index 0, for each element from index to end: include it, recurse, then backtrack (remove it).",
          "Base: when we have considered all elements, the current subset is a valid result.",
          "Total subsets = 2^n (include/exclude each of n elements).",
        ],
        timeComplexity: "O(n * 2^n)",
        spaceComplexity: "O(n) recursion depth",
        solutionVideoId: "REOH22Xwdkk",
      },
      {
        id: "rb-p2",
        title: "Permutations",
        difficulty: "Medium",
        description:
          "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
        examples: [
          {
            input: "nums = [1,2,3]",
            output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
          },
          { input: "nums = [0,1]", output: "[[0,1],[1,0]]" },
        ],
        constraints: [
          "1 <= nums.length <= 6",
          "-10 <= nums[i] <= 10",
          "All integers are unique.",
        ],
        starterCode: `function permute(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Backtracking"],
        logic: [
          "Use backtracking with a 'used' array to track which elements are in the current permutation.",
          "At each level, try adding each unused element to the current path.",
          "When the path length equals nums.length, add a copy to results.",
          "After recursing, backtrack: remove the element and mark it as unused.",
          "Total permutations = n! for n distinct elements.",
        ],
        timeComplexity: "O(n * n!)",
        spaceComplexity: "O(n)",
        solutionVideoId: "s7AvT7cGdSo",
      },
      {
        id: "rb-p3",
        title: "Combination Sum",
        difficulty: "Medium",
        description:
          "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times.",
        examples: [
          {
            input: "candidates = [2,3,6,7], target = 7",
            output: "[[2,2,3],[7]]",
          },
          {
            input: "candidates = [2,3,5], target = 8",
            output: "[[2,2,2,2],[2,3,3],[3,5]]",
          },
        ],
        constraints: [
          "1 <= candidates.length <= 30",
          "2 <= candidates[i] <= 40",
          "1 <= target <= 40",
          "All elements are distinct.",
        ],
        starterCode: `function combinationSum(candidates, target) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Backtracking"],
        logic: [
          "Use backtracking with a start index to avoid duplicate combinations.",
          "At each step, try each candidate from the start index onward.",
          "Subtract the chosen candidate from the remaining target.",
          "If remaining target = 0, add current combination to results.",
          "Allow reusing the same element (pass same index, not index+1).",
        ],
        timeComplexity: "O(n^(target/min))",
        spaceComplexity: "O(target/min) recursion depth",
        solutionVideoId: "GBKI9VSKdGg",
      },
      {
        id: "rb-p4",
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        description:
          "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent (like on a telephone keypad).",
        examples: [
          { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
          { input: 'digits = ""', output: "[]" },
        ],
        constraints: [
          "0 <= digits.length <= 4",
          "digits[i] is a digit in the range ['2', '9'].",
        ],
        starterCode: `function letterCombinations(digits) {\n  // Write your solution here\n  \n}`,
        tags: ["Hash Table", "String", "Backtracking"],
        logic: [
          "Map each digit to its corresponding letters (2->abc, 3->def, etc.).",
          "Use backtracking: for each digit, try each of its mapped letters.",
          "Build the combination character by character.",
          "When the combination length equals digits length, add to results.",
          "Backtrack by removing the last character and trying the next letter.",
        ],
        timeComplexity: "O(4^n) where n = digits.length",
        spaceComplexity: "O(n) recursion depth",
        solutionVideoId: "0snEunUacZY",
      },
      {
        id: "rb-p5",
        title: "N-Queens",
        difficulty: "Hard",
        description:
          "Place n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions. Each solution is a distinct board configuration.",
        examples: [
          {
            input: "n = 4",
            output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
          },
          { input: "n = 1", output: '[["Q"]]' },
        ],
        constraints: ["1 <= n <= 9"],
        starterCode: `function solveNQueens(n) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Backtracking"],
        logic: [
          "Place queens row by row. For each row, try each column.",
          "Check if placing a queen is safe: no queen in the same column, or diagonals.",
          "Use sets to track occupied columns, main diagonals (row-col), and anti-diagonals (row+col).",
          "If safe, place the queen, add to sets, and recurse to the next row.",
          "When all rows are filled, record the board. Backtrack to explore other placements.",
        ],
        timeComplexity: "O(n!)",
        spaceComplexity: "O(n^2) for the board",
        solutionVideoId: "Ph95IHmRp5M",
      },
    ],
  },

  // ────────────────────────────────────────────
  // 12. GREEDY ALGORITHMS
  // ────────────────────────────────────────────
  {
    id: "greedy",
    title: "Greedy Algorithms",
    description:
      "Learn the greedy approach where making the locally optimal choice at each step leads to a globally optimal solution.",
    icon: "zap",
    color: "accent",
    totalProblems: 5,
    totalVideos: 2,
    videos: [
      {
        id: "greedy-v1",
        title: "Introduction to Greedy Algorithms",
        youtubeId: "bC7o8P_Ste4",
        duration: "18:00",
        description:
          "Understand the greedy paradigm, when it works, and how to prove a greedy solution is correct.",
      },
      {
        id: "greedy-v2",
        title: "Greedy Interval Problems",
        youtubeId: "nONCGxWoUfM",
        duration: "22:30",
        description:
          "Learn classic greedy patterns for interval scheduling, merging, and activity selection problems.",
      },
    ],
    problems: [
      {
        id: "greedy-p1",
        title: "Jump Game",
        difficulty: "Medium",
        description:
          "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element represents your maximum jump length. Return true if you can reach the last index.",
        examples: [
          {
            input: "nums = [2,3,1,1,4]",
            output: "true",
            explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
          },
          {
            input: "nums = [3,2,1,0,4]",
            output: "false",
          },
        ],
        constraints: [
          "1 <= nums.length <= 10^4",
          "0 <= nums[i] <= 10^5",
        ],
        starterCode: `function canJump(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Greedy", "Dynamic Programming"],
        logic: [
          "Track the farthest index you can reach (maxReach).",
          "Iterate through the array. If current index > maxReach, you are stuck - return false.",
          "Update maxReach = max(maxReach, i + nums[i]).",
          "If maxReach >= last index at any point, return true.",
          "Greedy: always extend the farthest reachable position.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "Yan0cv2cLy8",
      },
      {
        id: "greedy-p2",
        title: "Jump Game II",
        difficulty: "Medium",
        description:
          "Given a 0-indexed array `nums` where nums[i] is the max jump length from index i, return the minimum number of jumps to reach the last index. You can assume you can always reach the last index.",
        examples: [
          {
            input: "nums = [2,3,1,1,4]",
            output: "2",
            explanation: "Jump to index 1, then to the last index.",
          },
        ],
        constraints: [
          "1 <= nums.length <= 10^4",
          "0 <= nums[i] <= 1000",
        ],
        starterCode: `function jump(nums) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Greedy", "Dynamic Programming"],
        logic: [
          "Use a BFS-like greedy approach with 'current end' and 'farthest'.",
          "farthest tracks the max reach from the current jump level.",
          "When you reach 'current end', you must make a jump - increment jumps.",
          "Update 'current end' to 'farthest'.",
          "Return jumps when you reach or pass the last index.",
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "dJ7sWiOoK7g",
      },
      {
        id: "greedy-p3",
        title: "Merge Intervals",
        difficulty: "Medium",
        description:
          "Given an array of `intervals` where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals.",
        examples: [
          {
            input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            output: "[[1,6],[8,10],[15,18]]",
            explanation: "[1,3] and [2,6] overlap, so merge them into [1,6].",
          },
        ],
        constraints: [
          "1 <= intervals.length <= 10^4",
          "intervals[i].length == 2",
          "0 <= start_i <= end_i <= 10^4",
        ],
        starterCode: `function merge(intervals) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Sorting"],
        logic: [
          "Sort intervals by start time.",
          "Initialize result with the first interval.",
          "For each subsequent interval, compare with the last interval in result.",
          "If it overlaps (start <= last end), merge by extending the end.",
          "If no overlap, add the new interval to the result.",
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "44H3cEC2fFM",
      },
      {
        id: "greedy-p4",
        title: "Non-overlapping Intervals",
        difficulty: "Medium",
        description:
          "Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.",
        examples: [
          {
            input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
            output: "1",
            explanation: "[1,3] can be removed.",
          },
          {
            input: "intervals = [[1,2],[1,2],[1,2]]",
            output: "2",
          },
        ],
        constraints: [
          "1 <= intervals.length <= 10^5",
          "intervals[i].length == 2",
        ],
        starterCode: `function eraseOverlapIntervals(intervals) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Greedy", "Sorting"],
        logic: [
          "Sort intervals by end time (greedy choice for interval scheduling).",
          "Track the end of the last non-overlapping interval.",
          "For each interval: if start >= last end, it does not overlap - keep it.",
          "If it overlaps (start < last end), remove it (increment count).",
          "Sorting by end time maximizes the number of non-overlapping intervals.",
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        solutionVideoId: "nONCGxWoUfM",
      },
      {
        id: "greedy-p5",
        title: "Hand of Straights",
        difficulty: "Medium",
        description:
          "Alice has some cards with numbers written on them. She wants to rearrange them into groups so that each group has `groupSize` consecutive cards. Return true if she can, false otherwise.",
        examples: [
          {
            input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
            output: "true",
            explanation: "Groups: [1,2,3], [2,3,4], [6,7,8].",
          },
          { input: "hand = [1,2,3,4,5], groupSize = 4", output: "false" },
        ],
        constraints: [
          "1 <= hand.length <= 10^4",
          "0 <= hand[i] <= 10^9",
          "1 <= groupSize <= hand.length",
        ],
        starterCode: `function isNStraightHand(hand, groupSize) {\n  // Write your solution here\n  \n}`,
        tags: ["Array", "Hash Table", "Greedy", "Sorting"],
        logic: [
          "If hand.length is not divisible by groupSize, return false.",
          "Sort the array and build a frequency map.",
          "For each card (in sorted order), if it still has count > 0, try to form a group starting from it.",
          "Check if the next groupSize-1 consecutive cards also exist. Decrement counts.",
          "If any card is missing, return false. If all groups are formed, return true.",
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        solutionVideoId: "amnrMCVd2YI",
      },
    ],
  },
];
