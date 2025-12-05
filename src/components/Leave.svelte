<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      const handleBeforeUnload = (e) => {
        // Standard way to trigger browser confirmation dialog
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue to be set
        return ''; // For older browsers
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    });
  </script>