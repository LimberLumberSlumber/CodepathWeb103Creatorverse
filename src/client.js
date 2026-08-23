import { createClient } from '@supabase/supabase-js'

const URL = 'https://rcejhqetcftujzxpfqqa.supabase.co/rest/v1/'

const API_KEY = 'sb_publishable_5v9ZncInTNiYdf5Lg9yXNg_BWAjlhtl'

export const supabase = createClient(URL, API_KEY)

