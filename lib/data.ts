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
  {
    id: "arrays",
    title: "Arrays",
    description:
      "Learn about array manipulation, searching, sorting, and common patterns like two pointers and sliding window.",
    icon: "brackets",
    color: "primary",
    totalProblems: 5,
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
          {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
          },
        ],
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9",
          "Only one valid answer exists.",
        ],
        starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
        tags: ["Hash Map", "Array"],
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
        starterCode: `function maxProfit(prices) {
  // Write your solution here
  
}`,
        tags: ["Array", "Dynamic Programming"],
      },
      {
        id: "arr-p3",
        title: "Contains Duplicate",
        difficulty: "Easy",
        description:
          "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
        examples: [
          {
            input: "nums = [1,2,3,1]",
            output: "true",
          },
          {
            input: "nums = [1,2,3,4]",
            output: "false",
          },
        ],
        constraints: [
          "1 <= nums.length <= 10^5",
          "-10^9 <= nums[i] <= 10^9",
        ],
        starterCode: `function containsDuplicate(nums) {
  // Write your solution here
  
}`,
        tags: ["Array", "Hash Table", "Sorting"],
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
            explanation:
              "The subarray [4,-1,2,1] has the largest sum 6.",
          },
          {
            input: "nums = [5,4,-1,7,8]",
            output: "23",
            explanation:
              "The subarray [5,4,-1,7,8] has the largest sum 23.",
          },
        ],
        constraints: [
          "1 <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4",
        ],
        starterCode: `function maxSubArray(nums) {
  // Write your solution here
  
}`,
        tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
      },
      {
        id: "arr-p5",
        title: "Product of Array Except Self",
        difficulty: "Medium",
        description:
          "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must write an algorithm that runs in O(n) time and without using the division operation.",
        examples: [
          {
            input: "nums = [1,2,3,4]",
            output: "[24,12,8,6]",
          },
          {
            input: "nums = [-1,1,0,-3,3]",
            output: "[0,0,9,0,0]",
          },
        ],
        constraints: [
          "2 <= nums.length <= 10^5",
          "-30 <= nums[i] <= 30",
          "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
        ],
        starterCode: `function productExceptSelf(nums) {
  // Write your solution here
  
}`,
        tags: ["Array", "Prefix Sum"],
      },
    ],
  },
  {
    id: "strings",
    title: "Strings",
    description:
      "Master string manipulation, pattern matching, and common algorithms like palindrome checking and anagram detection.",
    icon: "text",
    color: "accent",
    totalProblems: 4,
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
          {
            input: 's = "anagram", t = "nagaram"',
            output: "true",
          },
          {
            input: 's = "rat", t = "car"',
            output: "false",
          },
        ],
        constraints: [
          "1 <= s.length, t.length <= 5 * 10^4",
          "s and t consist of lowercase English letters.",
        ],
        starterCode: `function isAnagram(s, t) {
  // Write your solution here
  
}`,
        tags: ["Hash Table", "String", "Sorting"],
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
            explanation:
              '"amanaplanacanalpanama" is a palindrome.',
          },
          {
            input: 's = "race a car"',
            output: "false",
            explanation:
              '"raceacar" is not a palindrome.',
          },
        ],
        constraints: [
          "1 <= s.length <= 2 * 10^5",
          "s consists only of printable ASCII characters.",
        ],
        starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}`,
        tags: ["Two Pointers", "String"],
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
            explanation:
              'The answer is "abc", with the length of 3.',
          },
          {
            input: 's = "bbbbb"',
            output: "1",
            explanation:
              'The answer is "b", with the length of 1.',
          },
        ],
        constraints: [
          "0 <= s.length <= 5 * 10^4",
          "s consists of English letters, digits, symbols and spaces.",
        ],
        starterCode: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}`,
        tags: ["Hash Table", "String", "Sliding Window"],
      },
      {
        id: "str-p4",
        title: "Group Anagrams",
        difficulty: "Medium",
        description:
          'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word formed by rearranging the letters of a different word, using all the original letters exactly once.',
        examples: [
          {
            input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
            output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
          },
          {
            input: 'strs = [""]',
            output: '[[""]]',
          },
        ],
        constraints: [
          "1 <= strs.length <= 10^4",
          "0 <= strs[i].length <= 100",
          "strs[i] consists of lowercase English letters.",
        ],
        starterCode: `function groupAnagrams(strs) {
  // Write your solution here
  
}`,
        tags: ["Array", "Hash Table", "String", "Sorting"],
      },
    ],
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description:
      "Understand singly and doubly linked lists, pointer manipulation, and classic problems like cycle detection and reversal.",
    icon: "link",
    color: "primary",
    totalProblems: 4,
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
          {
            input: "head = [1,2,3,4,5]",
            output: "[5,4,3,2,1]",
          },
          {
            input: "head = [1,2]",
            output: "[2,1]",
          },
        ],
        constraints: [
          "The number of nodes in the list is the range [0, 5000].",
          "-5000 <= Node.val <= 5000",
        ],
        starterCode: `function reverseList(head) {
  // Write your solution here
  
}`,
        tags: ["Linked List", "Recursion"],
      },
      {
        id: "ll-p2",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        description:
          "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
        examples: [
          {
            input: "list1 = [1,2,4], list2 = [1,3,4]",
            output: "[1,1,2,3,4,4]",
          },
          {
            input: "list1 = [], list2 = []",
            output: "[]",
          },
        ],
        constraints: [
          "The number of nodes in both lists is in the range [0, 50].",
          "-100 <= Node.val <= 100",
          "Both list1 and list2 are sorted in non-decreasing order.",
        ],
        starterCode: `function mergeTwoLists(list1, list2) {
  // Write your solution here
  
}`,
        tags: ["Linked List", "Recursion"],
      },
      {
        id: "ll-p3",
        title: "Linked List Cycle",
        difficulty: "Easy",
        description:
          "Given `head`, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.",
        examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true",
            explanation:
              "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).",
          },
          {
            input: "head = [1], pos = -1",
            output: "false",
            explanation:
              "There is no cycle in the linked list.",
          },
        ],
        constraints: [
          "The number of the nodes in the list is in the range [0, 10^4].",
          "-10^5 <= Node.val <= 10^5",
          "pos is -1 or a valid index in the linked-list.",
        ],
        starterCode: `function hasCycle(head) {
  // Write your solution here
  
}`,
        tags: ["Hash Table", "Linked List", "Two Pointers"],
      },
      {
        id: "ll-p4",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        description:
          "Given the `head` of a linked list, remove the nth node from the end of the list and return its head.",
        examples: [
          {
            input: "head = [1,2,3,4,5], n = 2",
            output: "[1,2,3,5]",
          },
          {
            input: "head = [1], n = 1",
            output: "[]",
          },
        ],
        constraints: [
          "The number of nodes in the list is sz.",
          "1 <= sz <= 30",
          "0 <= Node.val <= 100",
          "1 <= n <= sz",
        ],
        starterCode: `function removeNthFromEnd(head, n) {
  // Write your solution here
  
}`,
        tags: ["Linked List", "Two Pointers"],
      },
    ],
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    description:
      "Learn LIFO and FIFO data structures, their applications, and how to use them to solve complex problems.",
    icon: "layers",
    color: "accent",
    totalProblems: 3,
    totalVideos: 2,
    videos: [
      {
        id: "sq-v1",
        title: "Stack Data Structure",
        youtubeId: "bxRVz8zklWM",
        duration: "14:20",
        description:
          "Understand the stack data structure, LIFO principle, and common operations like push, pop, and peek.",
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
          "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
        examples: [
          {
            input: 's = "()"',
            output: "true",
          },
          {
            input: 's = "([)]"',
            output: "false",
          },
        ],
        constraints: [
          "1 <= s.length <= 10^4",
          "s consists of parentheses only '()[]{}'.",
        ],
        starterCode: `function isValid(s) {
  // Write your solution here
  
}`,
        tags: ["String", "Stack"],
      },
      {
        id: "sq-p2",
        title: "Min Stack",
        difficulty: "Medium",
        description:
          "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        examples: [
          {
            input:
              '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
            output: "[null,null,null,null,-3,null,0,-2]",
          },
        ],
        constraints: [
          "-2^31 <= val <= 2^31 - 1",
          "Methods pop, top and getMin operations will always be called on non-empty stacks.",
        ],
        starterCode: `class MinStack {
  constructor() {
    // Initialize your data structure here
  }
  
  push(val) {
    
  }
  
  pop() {
    
  }
  
  top() {
    
  }
  
  getMin() {
    
  }
}`,
        tags: ["Stack", "Design"],
      },
      {
        id: "sq-p3",
        title: "Implement Queue using Stacks",
        difficulty: "Easy",
        description:
          "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).",
        examples: [
          {
            input:
              '["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]',
            output: "[null, null, null, 1, 1, false]",
          },
        ],
        constraints: [
          "1 <= x <= 9",
          "At most 100 calls will be made to push, peek, pop, and empty.",
          "All the calls to pop and peek are valid.",
        ],
        starterCode: `class MyQueue {
  constructor() {
    // Initialize your data structure here
  }
  
  push(x) {
    
  }
  
  pop() {
    
  }
  
  peek() {
    
  }
  
  empty() {
    
  }
}`,
        tags: ["Stack", "Design", "Queue"],
      },
    ],
  },
  {
    id: "trees",
    title: "Trees",
    description:
      "Explore binary trees, BSTs, tree traversals, and recursive problem-solving techniques.",
    icon: "git-branch",
    color: "primary",
    totalProblems: 4,
    totalVideos: 2,
    videos: [
      {
        id: "tree-v1",
        title: "Binary Tree Fundamentals",
        youtubeId: "fAAZixBzIAI",
        duration: "23:10",
        description:
          "Learn about binary trees, tree terminology, and the three types of tree traversals: inorder, preorder, and postorder.",
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
          "Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        examples: [
          {
            input: "root = [3,9,20,null,null,15,7]",
            output: "3",
          },
          {
            input: "root = [1,null,2]",
            output: "2",
          },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 10^4].",
          "-100 <= Node.val <= 100",
        ],
        starterCode: `function maxDepth(root) {
  // Write your solution here
  
}`,
        tags: ["Tree", "DFS", "BFS", "Binary Tree"],
      },
      {
        id: "tree-p2",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        description:
          "Given the `root` of a binary tree, invert the tree, and return its root.",
        examples: [
          {
            input: "root = [4,2,7,1,3,6,9]",
            output: "[4,7,2,9,6,3,1]",
          },
          {
            input: "root = [2,1,3]",
            output: "[2,3,1]",
          },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 100].",
          "-100 <= Node.val <= 100",
        ],
        starterCode: `function invertTree(root) {
  // Write your solution here
  
}`,
        tags: ["Tree", "DFS", "BFS", "Binary Tree"],
      },
      {
        id: "tree-p3",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        description:
          "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).",
        examples: [
          {
            input: "root = [2,1,3]",
            output: "true",
          },
          {
            input: "root = [5,1,4,null,null,3,6]",
            output: "false",
            explanation:
              "The root node's value is 5 but its right child's value is 4.",
          },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [1, 10^4].",
          "-2^31 <= Node.val <= 2^31 - 1",
        ],
        starterCode: `function isValidBST(root) {
  // Write your solution here
  
}`,
        tags: ["Tree", "DFS", "BST", "Binary Tree"],
      },
      {
        id: "tree-p4",
        title: "Level Order Traversal",
        difficulty: "Medium",
        description:
          "Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        examples: [
          {
            input: "root = [3,9,20,null,null,15,7]",
            output: "[[3],[9,20],[15,7]]",
          },
          {
            input: "root = [1]",
            output: "[[1]]",
          },
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 2000].",
          "-1000 <= Node.val <= 1000",
        ],
        starterCode: `function levelOrder(root) {
  // Write your solution here
  
}`,
        tags: ["Tree", "BFS", "Binary Tree"],
      },
    ],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Master memoization, tabulation, and common DP patterns like knapsack, LCS, and coin change.",
    icon: "brain",
    color: "accent",
    totalProblems: 4,
    totalVideos: 2,
    videos: [
      {
        id: "dp-v1",
        title: "Introduction to Dynamic Programming",
        youtubeId: "oBt53YbR9Kk",
        duration: "30:00",
        description:
          "Understand the core concepts of dynamic programming: overlapping subproblems, optimal substructure, memoization and tabulation.",
      },
      {
        id: "dp-v2",
        title: "Common DP Patterns",
        youtubeId: "nqowUJzG-iM",
        duration: "28:15",
        description:
          "Learn the most common DP patterns including 1D DP, 2D DP, and how to recognize which pattern to use.",
      },
    ],
    problems: [
      {
        id: "dp-p1",
        title: "Climbing Stairs",
        difficulty: "Easy",
        description:
          "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
          {
            input: "n = 2",
            output: "2",
            explanation: "1. 1 step + 1 step. 2. 2 steps.",
          },
          {
            input: "n = 3",
            output: "3",
            explanation:
              "1. 1 step + 1 step + 1 step. 2. 1 step + 2 steps. 3. 2 steps + 1 step.",
          },
        ],
        constraints: ["1 <= n <= 45"],
        starterCode: `function climbStairs(n) {
  // Write your solution here
  
}`,
        tags: ["Math", "Dynamic Programming", "Memoization"],
      },
      {
        id: "dp-p2",
        title: "Coin Change",
        difficulty: "Medium",
        description:
          "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        examples: [
          {
            input: "coins = [1,5,11], amount = 11",
            output: "3",
            explanation: "11 = 5 + 5 + 1",
          },
          {
            input: "coins = [2], amount = 3",
            output: "-1",
          },
        ],
        constraints: [
          "1 <= coins.length <= 12",
          "1 <= coins[i] <= 2^31 - 1",
          "0 <= amount <= 10^4",
        ],
        starterCode: `function coinChange(coins, amount) {
  // Write your solution here
  
}`,
        tags: ["Array", "Dynamic Programming", "BFS"],
      },
      {
        id: "dp-p3",
        title: "House Robber",
        difficulty: "Medium",
        description:
          "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
        examples: [
          {
            input: "nums = [1,2,3,1]",
            output: "4",
            explanation:
              "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4.",
          },
          {
            input: "nums = [2,7,9,3,1]",
            output: "12",
            explanation:
              "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total = 2 + 9 + 1 = 12.",
          },
        ],
        constraints: [
          "1 <= nums.length <= 100",
          "0 <= nums[i] <= 400",
        ],
        starterCode: `function rob(nums) {
  // Write your solution here
  
}`,
        tags: ["Array", "Dynamic Programming"],
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
            explanation:
              "The longest increasing subsequence is [2,3,7,101], therefore the length is 4.",
          },
          {
            input: "nums = [0,1,0,3,2,3]",
            output: "4",
          },
        ],
        constraints: [
          "1 <= nums.length <= 2500",
          "-10^4 <= nums[i] <= 10^4",
        ],
        starterCode: `function lengthOfLIS(nums) {
  // Write your solution here
  
}`,
        tags: ["Array", "Binary Search", "Dynamic Programming"],
      },
    ],
  },
];
