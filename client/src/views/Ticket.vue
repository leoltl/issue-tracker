<template>
  <div class="ticket">
    <section class="ticket-main">
      <SubSection :title="'Ticket details'" class="sub-section-details">
        <div v-for="[title, data] of issueData" class="entry" :key="title">
          <span class="title">{{ title }}:</span> <span class="value">{{ data }}</span>
        </div>
      </SubSection>
      <SubSection :title="'Ticket comments'" class="sub-section-comment">
        
      </SubSection>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SubSection from '@/components/SubSection';
export default {
  components: {
    SubSection
  },
  computed: {
    ...mapState([
      "currentIssue"
    ]),
    issueData() {
      return Object.entries(this.currentIssue)
    }
  },
  created() {
    if(this.$route.params.ticketId) {
      this.$store.dispatch('getTicketDetails', this.$route.params.ticketId)
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket {
  height: 100%;
  background-color: #eee;
  padding-top: 2vh;
}
.ticket-main {
  margin: 0 2.5vw;
  display: grid;
  grid-template: "details comment";
  grid-template-columns: 1fr 1fr;
  grid-gap: 2.5vw;
  .sub-section-details {
    grid-area: details;
  }
  .sub-section-comment {
    grid-area: comment;
  }
  .entry {
    border-bottom: 2px solid #ccc;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>