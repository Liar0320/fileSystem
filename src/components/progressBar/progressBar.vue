<template>
  <div class="progress">
    <div
      class="progress__bar progress__bar--warning progress__striped "
      :class="progressBarClass"
      role="progressbar"
      :style="{ width: this.value + '%' }"
    >
      {{ this.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    status: {
      // type: 'ready' || 'onloading' || 'cancel' || 'completed',
      default: 'ready',
    },
    type: {
      // type: 'primary' || 'success' || 'warning' || 'danger' || 'info',
      default: 'success',
    },
  },
  data: function() {
    return {
      isCompleted: false,
    };
  },
  mounted() {
    console.log('init');
  },
  computed: {
    progressBarClass() {
      let className = [];

      if (!this.isCompleted) {
        className.push('active');
      }
      if (this.status !== 'cancel') {
        className.push(`progress__bar--${this.type}`);
      } else {
        className.push(`progress__bar--${this.danger}`);
      }

      return className.join(' ');
    },
    text() {
      if (this.status === 'cancel') {
        return '上传失败';
      }

      return this.value + '%';
    },
  },
  watch: {
    value() {
      if (this.value === 100) {
        this.isCompleted = true;
        this.$emit('completed', true);
      } else {
        this.isCompleted = false;
      }
    },
  },
};
</script>

<style lang="scss">
// @import './color.scss';
// progress
$brand-primary: darken(#428bca, 6.5%);
$brand-success: #5cb85c;
$brand-warning: #f0ad4e;
$brand-danger: #d9534f;
$brand-info: #5bc0de;

$progress-bg: #f5f5f5;
$progress-bar-color: #fff;
$progress-border-radius: 4px;
$progress-bar-bg: $brand-primary;
.progress {
  width: 100%;
  height: 20px;
  background-color: $progress-bg;
  border-radius: $progress-border-radius;
  overflow: hidden;
  &__bar {
    width: 100%;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: $progress-bar-color;
    background-color: $progress-bar-bg;

    &--primary {
      background-color: $brand-primary;
    }
    &--success {
      background-color: $brand-success;
    }
    &--warning {
      background-color: $brand-warning;
    }
    &--danger {
      background-color: $brand-danger;
    }
    &--info {
      background-color: $brand-info;
    }

    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    transition: width 0.6s ease;
    text-align: center;
  }
  &__striped {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    &.active {
      animation: tick__stripes 2s linear infinite;
    }
  }
}

@keyframes tick__stripes {
  from {
    background-position: 40px;
  }
  to {
    background-position: 0px;
  }
}
</style>
