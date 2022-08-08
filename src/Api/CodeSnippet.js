import axios from "axios";

async function getRawGithubCode(folder_link, question_name){
  await axios.get('https://github.com/DLi7077/Leetcode-Solutions/blob/master/125-valid-palindrome/125-valid-palindrome.cpp')
}