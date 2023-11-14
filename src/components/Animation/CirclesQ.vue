<template>
    <div class="flex items-center justify-center mt-5 min-h-max">
        <svg class="w-full h-auto max-w-[10rem]" style="stroke-linecap: round" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 340 340">
            <circle cx="170" cy="170" r="160" class="stroke-[#f87171] dark:stroke-[#ef4444]" />
            <circle cx="170" cy="170" r="135" class="stroke-[#404041]" />
            <circle cx="170" cy="170" r="110" class="stroke-[#f87171] dark:stroke-[#ef4444]" />
            <circle cx="170" cy="170" r="85" class="stroke-[#404041]" />
        </svg>
    </div>
</template>

<style lang="scss" scoped>
circle {
    fill: none;
    stroke-width: 3.5;
    animation-name: preloader;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transform-origin: 170px 170px;
    will-change: transform;

    &:nth-of-type(1) {
        stroke-dasharray: 550px;
    }

    &:nth-of-type(2) {
        stroke-dasharray: 500px;
    }

    &:nth-of-type(3) {
        stroke-dasharray: 450px;
    }

    &:nth-of-type(4) {
        stroke-dasharray: 300px;
    }

    @for $i from 1 through 4 {
        &:nth-of-type(#{$i}) {
            animation-delay: -#{$i * 0.15}s;
        }
    }
}

@keyframes preloader {
    50% {
        transform: rotate(360deg);
    }
}
</style>
