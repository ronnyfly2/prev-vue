import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import store from '@/store'

Vue.use(Router)
let loadView=(path,view)=>{
	//return () => import(/* webpackChunkName: "view-[request]" */`@/components/Employers/${view}.vue`)
	return () => import(`@/views/${path}/${view}.vue`)
}
console.log('item one');
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
      path: '/v1/auth/:id',
      name: 'auth',
      components:{
				defaultHeader: Header,
				containerBlock: loadView('Auth','Index'),
			}
    },
    {
			path: '/',
			name: 'home',
			components:{
				defaultHeader: Header,
				containerBlock: loadView('Home','Home'),
				footer: Footer
			},
			meta: { requiresAuth: true }
		},
		{
      path: '*',
      name: 'page',
      components:{
				defaultHeader: Header,
				containerBlock: loadView('ErrorPage','PageNotFound'),
			}
    },
    {
      path: '/about',
      name: 'about',
      components:{
				defaultHeader: Header,
				containerBlock: loadView('About','About'),
				footer: Footer
			},
			meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next)=>{
		const reouteProtect = to.matched.some(record => record.meta.requiresAuth);
		console.log('estoreeee', store.state.activeSession)
		const sessionActive = store.state.activeSession;
		if(reouteProtect && !sessionActive){
			next({path:'/404'});
		}else{
			next();
		}
	}
)

export default router;
