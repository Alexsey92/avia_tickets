import '../css/style.css';
import './plugins'
import locations from './store/locations.js'
import formUi from './views/form';
import currencyUi from './views/currency';
import ticketsUi from './views/tickets';
import favoriteTicketsUi from './store/favorite';

const favoriteBtn = document.getElementById('favorites')

document.addEventListener('DOMContentLoaded',()=>{
	
	initApp()
	const form=formUi.form
	//evens

	form.addEventListener('submit',e=>{
		e.preventDefault();
		onFormSubmit()
	})


	//Heandlers
	async function initApp(){
		await locations.init()
		formUi.setAutocompleteData(locations.shortCitiesList)
	}

	async function onFormSubmit(){
		//собрать данные из инпутов
		const origin=locations.getCityCodeByKey(formUi.originValue);
		const destination = locations.getCityCodeByKey(formUi.destinationValue);
		const depart_date=formUi.departDateValue;
		const return_date =formUi.returnDateValue;
		const currency = currencyUi.currencyValue;

		
		await locations.fetchTickets({
			origin, destination, depart_date, return_date, currency
		})

		ticketsUi.rendertickets(locations.lastSearch)
	}

})

document.addEventListener('click',e=>{
	const target=e.target

	const item = document.getElementById('dropdown1')
		if (target.closest('.favorites')   ){
			if ( target.classList.contains('dropdown-trigger')){
				item.classList.toggle('d-none')
			}
		}else{
			item.classList.remove('d-none')
		}
	if (target.classList.contains('add-favorite')) {
		
		const card = target.parentNode
		const ticket = favoriteTicketsUi.getTicketByHTMLCode(card)
		favoriteTicketsUi.addFavoriteTicket(ticket)
		console.log(ticket);

	}

	if (target.classList.contains('delete-favorite')) {
		const card = target.closest('.favorite-item')
		favoriteTicketsUi.removeFavoriteTicket(card)
	}

}
	)

