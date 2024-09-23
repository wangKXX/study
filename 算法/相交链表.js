var getIntersectionNode = function(headA, headB) {
  let tempA = headA
  let tempB = headB
  while(tempA !== tempB) {
      tempA = tempA !== null ? tempA.next : headA
      tempB = tempB !== null ? tempB.next : headB
  }
  return tempA
};