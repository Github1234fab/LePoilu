<script>
    export let filled = false;
    export let size = 20;
    export let color = "currentColor";
</script>

<svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? color : "none"} 
    stroke={filled ? color : "currentColor"} 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.044 3 5.5L12 21l7-7z"/>
</svg>
