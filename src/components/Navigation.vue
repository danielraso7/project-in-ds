<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark">
    <div class="container-fluid d-flex flex-column p-0">
      <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
        <div class="sidebar-brand-icon rotate-n-15"><i class="fa-solid fa-ticket"></i></div>
        <div class="sidebar-brand-text mx-3"><span>Klimaticket</span><br /><span>Geo-Goalifying</span></div>
      </a>
      <hr class="sidebar-divider my-0" />
      <ul class="navbar-nav text-light" id="accordionSidebar">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/" active-class="active"><i class="fa-solid fa-home"></i><span>&nbsp;Dashboard</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/trips" active-class="active"><i class="fa-solid fa-train"></i><span>&nbsp;Trips</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/goals" active-class="active"><i class="fa-solid fa-bullseye"></i><span>&nbsp;Goals</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/map" active-class="active"><i class="fa-solid fa-map"></i><span>&nbsp;Map</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/settings" active-class="active"><i class="fa-solid fa-gear"></i><span>&nbsp;Settings</span></RouterLink>
        </li>
      </ul>
      <div class="text-center d-none d-md-inline mb-5"><button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
      <div
        id="id5b2be0beb4474"
        a='{"t":"r","v":"1.2","lang":"en","locs":[681],"ssot":"c","sics":"ds","cbkg":"#FFFFFF00","cfnt":"#ffffff","codd":"rgba(78,115,223,1)","cont":"#000000d4","stof":"5"}'
      >
        Weather Data Source: <a href="https://sharpweather.com/weather_linz/30_days/">Linz weather 30 days</a>
      </div>
    </div>
  </nav>
</template>
