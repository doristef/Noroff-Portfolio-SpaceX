<template>

    <b-navbar fixed="top" toggleable="lg" type="dark" class="[ bg-nav bg-nav-border ]">
        <b-navbar-brand to="/">SpaceX - Dashboard</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item-dropdown  v-for="(dropdownList, key) in dropdown" :key="key" :text="key" right>
                <b-dropdown-item v-for="(item, key) in dropdownList" :key="key" :to="key" active-class="active">{{item}}</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-for="(nav, key) in navigation" :key="key" :to="key" active-class="active">{{nav}}</b-nav-item>
        </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script>

export default {
    name: 'navigation',
    props: ['dropdown', 'navigation'],
}
</script>