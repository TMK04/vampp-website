<script lang="ts">
	export let role: "User" | "Beholder";
	const obj_role_container_class = {
		User: "",
		Beholder: "bg-light"
	};
	const obj_role_header_class = {
		User: "text-primary",
		Beholder: "text-accent"
	};
</script>

<section class="rounded-sm {obj_role_container_class[role]} px-[10%] pb-5 pt-3.5 text-text">
	<header class="ms-1 font-bold {obj_role_header_class[role]}">{role}:</header>
	<slot />
</section>
