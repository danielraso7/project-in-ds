<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand bg-white shadow mb-4 topbar">
    <div class="container-fluid">
      <button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fa-solid fa-bars"></i></button>
      <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div class="input-group">
          <input class="bg-light form-control border-0 small" type="text" placeholder="Search for ..." /><button
            class="btn btn-primary py-0"
            type="button"
          >
            <i class="fa-solid fa-search"></i>
          </button>
        </div>
      </form>
      <ul class="navbar-nav flex-nowrap ms-auto">
        <li class="nav-item dropdown d-sm-none no-arrow">
          <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i class="fa-solid fa-search"></i></a>
          <div class="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
            <form class="me-auto navbar-search w-100">
              <div class="input-group">
                <input class="bg-light border-0 form-control small" type="text" placeholder="Search for ..." /><button
                  class="btn btn-primary"
                  type="button"
                >
                  <i class="fa-solid fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </li>
        <li class="nav-item dropdown no-arrow mx-1">
          <div class="nav-item dropdown no-arrow">
            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"
              ><span class="badge bg-danger badge-counter">3+</span><i class="fa-solid fa-bell fa-fw"></i
            ></a>
            <div class="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
              <h6 class="dropdown-header">alerts center</h6>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="me-3">
                  <div class="bg-primary icon-circle"><i class="fa-solid fa-file-alt text-white"></i></div>
                </div>
                <div>
                  <span class="small text-gray-500">December 12, 2024</span>
                  <p>A new monthly report is ready to be downloaded!</p>
                </div> </a
              ><a class="dropdown-item d-flex align-items-center" href="#">
                <div class="me-3">
                  <div class="bg-success icon-circle"><i class="fa-solid fa-donate text-white"></i></div>
                </div>
                <div>
                  <span class="small text-gray-500">December 7, 2024</span>
                  <p>You are finally break-even! Well done traveller!</p>
                </div> </a
              ><a class="dropdown-item d-flex align-items-center" href="#">
                <div class="me-3">
                  <div class="bg-warning icon-circle"><i class="fa-solid fa-exclamation-triangle text-white"></i></div>
                </div>
                <div>
                  <span class="small text-gray-500">December 2, 2024</span>
                  <p>You have a lot of open goals! Go for trip to complete them :)</p>
                </div> </a
              ><a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown no-arrow mx-1">
          <div class="nav-item dropdown no-arrow">
            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"
              ><span class="badge bg-danger badge-counter">7</span><i class="fa-solid fa-envelope fa-fw"></i
            ></a>
            <div class="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
              <h6 class="dropdown-header">alerts center</h6>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image me-3">
                  <img class="rounded-circle" src="@/assets/dog.png" />
                  <div class="bg-success status-indicator"></div>
                </div>
                <div class="fw-bold">
                  <div class="text-truncate"><span>Hi there! I am wondering if you can help me with a problem I've been having.</span></div>
                  <p class="small text-gray-500 mb-0">Max Verstappen - 58m</p>
                </div> </a
              ><a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image me-3">
                  <img class="rounded-circle" src="@/assets/dog.png" />
                  <div class="status-indicator"></div>
                </div>
                <div class="fw-bold">
                  <div class="text-truncate"><span>Hi there! I am wondering if you can help me with a problem I've been having.</span></div>
                  <p class="small text-gray-500 mb-0">Jean Todd - 1d</p>
                </div> </a
              ><a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image me-3">
                  <img class="rounded-circle" src="@/assets/dog.png" />
                  <div class="bg-warning status-indicator"></div>
                </div>
                <div class="fw-bold">
                  <div class="text-truncate">
                    <span>Hi there! I am wondering if you can help me with a problem I've been having.</span>
                  </div>
                  <p class="small text-gray-500 mb-0">Michael Schumacher - 2d</p>
                </div> </a
              ><a class="dropdown-item d-flex align-items-center" href="#">
                <div class="dropdown-list-image me-3">
                  <img class="rounded-circle" src="@/assets/dog.png" />
                  <div class="bg-success status-indicator"></div>
                </div>
                <div class="fw-bold">
                  <div class="text-truncate">
                    <span>Hi there! I am wondering if you can help me with a problem I've been having.</span>
                  </div>
                  <p class="small text-gray-500 mb-0">Felipe Massa · 2w</p>
                </div> </a
              ><a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
            </div>
          </div>
          <div class="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
        </li>
        <div class="d-none d-sm-block topbar-divider"></div>
        <li class="nav-item dropdown no-arrow">
          <div class="nav-item dropdown no-arrow">
            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"
              ><span class="d-none d-lg-inline me-2 text-gray-600 small">raso_username73</span
              ><img class="border rounded-circle img-profile" src="@/assets/dog.png"
            /></a>
            <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
              <RouterLink class="dropdown-item" href="#" to="/settings"
                ><i class="fa-solid fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings</RouterLink
              ><a class="dropdown-item" href="#"><i class="fa-solid fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#"><i class="fa-solid fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
