<template>
  <div
    style="grid-template-rows: 1fr 52px 32px"
    :class="['max-w-xs', 'w-[9999rem]', 'grid', 'grid-cols-1']">
    <div
      style="grid-area: 1/1/3/2"
      :class="[
        'w-full',
        'aspect-square',
        'rounded-lg',
        'shadow-md',
        'bg-primary/15',
        'object-cover',
      ]" />
    <div
      :class="['mx-3', 'rounded-lg', 'bg-background', 'self-end', 'shadow-lg']"
      style="grid-area: 2/1/4/2">
      <div :class="['bg-primary/10', 'rounded-lg', 'p-4']">
        <div :class="['h-7', 'mb-3', 'bg-primary/15', 'animate-pulse', 'rounded']" />
        <div class="flex items-center gap-1 justify-end">
          <div :class="['aspect-square rounded-full ml-1 w-5 h-5 bg-primary/15 animate-pulse']" />
          <div class="text-xs italic bg-primary/15 animate-pulse w-24 h-4 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
