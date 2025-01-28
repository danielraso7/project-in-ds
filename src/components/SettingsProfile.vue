<script setup>
import { onMounted, reactive } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { useProfile } from '@/composables/useProfile'

const { klimaticketType, klimaticketCostClassic, klimaticketCostSpecial, fetchKlimaticketInfo, updateKlimaticketType } = useProfile()

// TODO: DB???
const formData = reactive({
  username: 'raso_username73',
  email: 'danielraso@gmail.com',
  pwd: 'mysavepassword',
  first_name: 'Daniel',
  last_name: 'Raso',
})

const handleUpdate = async () => {
  await updateKlimaticketType(klimaticketType.value)
}

onMounted(fetchKlimaticketInfo)
</script>

<template>
  <div class="row mb-3">
    <div class="col-lg-4">
      <div class="card shadow mb-3">
        <div class="card-body text-center shadow">
          <img class="rounded-circle mb-3 mt-4" src="@/assets/dog.png" width="160" height="160" />
          <SubmitButton :button-text="'Change Photo'" />
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <h6 class="text-primary m-0 fw-bold">User Settings</h6>
            </div>
            <div class="card-body">
              <form @submit.prevent="">
                <div class="row">
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label" for="username"><strong>Username</strong></label
                      ><input
                        id="username"
                        class="form-control"
                        type="text"
                        placeholder="user.name"
                        name="username"
                        v-model="formData.username"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label" for="email"><strong>Email Address</strong></label
                      ><input
                        id="email"
                        class="form-control"
                        type="email"
                        placeholder="user@example.com"
                        name="email"
                        v-model="formData.email"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label" for="pwd"><strong>Password</strong></label
                      ><input id="pwd" class="form-control" type="password" placeholder="mysavepassword" name="pwd" v-model="formData.pwd" required />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label" for="first_name"><strong>First Name</strong></label
                      ><input
                        id="first_name"
                        class="form-control"
                        type="text"
                        placeholder="John"
                        name="first_name"
                        v-model="formData.first_name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label" for="last_name"><strong>Last Name</strong></label
                      ><input
                        id="last_name"
                        class="form-control"
                        type="text"
                        placeholder="Doe"
                        name="last_name"
                        v-model="formData.last_name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <SubmitButton :button-text="'Update Profile'" />
              </form>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <h6 class="text-primary m-0 fw-bold">Klimaticket Type</h6>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleUpdate">
                <div class="row mb-3">
                  <div class="col">
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="klimaticketSwitch" v-model="klimaticketType" />
                      <label class="form-check-label" for="klimaticketSwitch">
                        {{
                          klimaticketType
                            ? `&nbsp;Jugend/Senior/Spezial (€ ${klimaticketCostSpecial},-)`
                            : `&nbsp;Classic (€ ${klimaticketCostClassic},-)`
                        }}
                      </label>
                    </div>
                  </div>
                </div>
                <SubmitButton :button-text="'Update Klimaticket Type'" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
