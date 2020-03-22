<template lang="pug">
  .search
    span.search__title Champions
    .search__knob-tag(@click="toggleTabBar()" :class="searchBarStatus.isTagOpen ? 'active' : ''")
      img(src="~/assets/images/util/category.svg")
    .search__knob-keyword(@click="toggleKeywordBar()" :class="searchBarStatus.isKeywordOpen ? 'active' : ''")
      img(src="~/assets/images/util/search.svg")

    .search__bar-tag(:class="searchBarStatus.isTagOpen ? 'active' : ''")
      .search__bar-tag__role(v-for="(role, key) in championRoles" :key="key")
        input(type="checkbox" @change="updateFilter()" :id="role.id" :value="role.id" v-model="selectedRoles")
        label(:for="role.id") {{ role.nameJP }}

    .search__bar-keyword(:class="searchBarStatus.isKeywordOpen ? 'active' : ''")
      input.search__bar-keyword__input(placeholder="Xerath" spellcheck="false" @input="updateFilter()" v-model="filledKeyword")

</template>

<script>
import ChampionRoleJSON from '~/lib/LoLChampionRoles.json'

export default {
  data() {
    return {
      searchBarStatus: {
        isTagOpen: false,
        isKeywordOpen: false
      },
      selectedRoles: [],
      filledKeyword: '',
      championRoles: ChampionRoleJSON
    }
  },
  methods: {
    toggleTabBar() {
      this.searchBarStatus.isKeywordOpen = false
      this.searchBarStatus.isTagOpen = !this.searchBarStatus.isTagOpen
    },

    toggleKeywordBar() {
      this.searchBarStatus.isTagOpen = false
      this.searchBarStatus.isKeywordOpen = !this.searchBarStatus.isKeywordOpen
    },
    updateFilter() {
      this.$emit('updateFilter', {
        roles: this.selectedRoles,
        keywords: this.filledKeyword
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  padding: 15px;
  min-height: 60px;
  background-color: $color-white;
  max-width: $pc;
  margin: 20px auto 40px auto;
  border-radius: $medium-radius-size;
  filter: drop-shadow(3px 3px 10px $color-gray);
  overflow: hidden;

  &__title {
    display: block;
    text-align: center;
    line-height: 30px;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 14px;
    text-transform: uppercase;
  }

  &__knob-tag {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    left: 15px;
    top: 15px;
    z-index: 3;
    transition: filter 0.4s ease, border 0.2s ease;
    background-color: $color-white;
    border: solid 2px transparent;
    border-radius: 3px;
    filter: invert(0);
    cursor: pointer;
    user-select: none;

    &:hover {
      border: solid 2px $color-gray;
    }

    img {
      object-fit: contain;
      margin: 5px;
      height: 20px;
      vertical-align: top;
    }
  }

  &__knob-keyword {
    @extend .search__knob-tag;
    left: unset;
    right: 15px;
  }

  &__bar-tag {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    right: 100%;
    top: 0;
    z-index: 2;
    background-color: $color-black;
    transition: 0.4s ease;

    &__role {
      user-select: none;

      &:not(:last-of-type) {
        margin-right: 5px;
      }

      input {
        display: none;

        &:checked + label {
          background-color: $color-white;
          color: $color-black;
        }
      }

      label {
        display: inline-block;
        font-size: 9px;
        letter-spacing: 1px;
        font-weight: 600;
        color: $color-white;
        background-color: $color-black;
        transition: 0.1s ease;
        padding: 5px 10px;
        border-radius: $small-radius-size;
        text-transform: uppercase;
        vertical-align: super;
        cursor: pointer;

        &:hover {
          background-color: $color-darkgray;
        }
      }
    }

    &.active {
      right: 0%;
    }
  }

  &__bar-keyword {
    @extend .search__bar-tag;
    right: unset;
    left: 100%;

    &__input {
      height: 30px;
      min-width: 240px;
      padding: 0 5px;
      outline: none;
      border: none;
      border-radius: $small-radius-size;
      font-size: 12px;

      @media screen and (max-width: $tablet) {
        width: calc(100% - 120px);
      }
    }

    &.active {
      left: 0%;
    }
  }
}
</style>
