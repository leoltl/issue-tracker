<template>
  <div class="comment" :class="{'own': currentUser == comment.authorId.name }">
    <div class="comment-meta">
      <span class="comment-date"> {{ comment.createdAt | displayDate }} </span>
      <span class="comment-name"> {{ currentUser == comment.authorId.name ? 'Me' : comment.authorId.name }} </span>
    </div>
    <div class="comment-message">
      {{ comment.body }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentRow",
  props: ["comment", "currentUser"]
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

  .comment {
    .comment-meta {
      font-size: 0.85rem;
      display: flex;
      justify-content: space-between;
      .comment-date {
        visibility: hidden;
        font-size: 0.7rem;
      }
    }
    &:hover {
      .comment-date {
        visibility: visible;
      }
    }
  }
  

  .own {
    .comment-meta {
      flex-direction: row-reverse;
      padding-left: 17px;
    }
    .comment-message::after {
      left: 15px;
    }
  }
</style>