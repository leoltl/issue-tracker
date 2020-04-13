<template>
  <div class="comment">
    <div class="comment-meta">
      <span class="comment-date"> {{ comment.createdAt | displayDate }} </span>
      <span class="comment-name"> {{ comment.authorId.name }} </span>
    </div>
    <div class="comment-message">
      {{ comment.body }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentRow",
  props: ["comment"]
}
</script>

<style lang="scss">
  .comment-message {
    color: white;
    font-size: 0.9rem;
    margin: 0.6rem;
    padding: 0.75rem;
    border-radius: 10px;
    position: relative;
    background: rgb(8, 127, 254);
    &::after{
      content:"";
      position: absolute; 
      height: 12px;
      width: 12px;
      display: block;
      transform: rotate(45deg);
      right: 15px;
      top: -4px; 
      background-color: rgb(8, 127, 254);
      z-index: inherit;
    }
  }
  .comment-meta {
    font-size: 0.85rem;
    display: flex;
    justify-content: space-between;
    .comment-date {
      font-size: 0.7rem;
    }
  }
</style>