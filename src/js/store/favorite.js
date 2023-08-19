

class FavoriteTicket{
	constructor(){
		this.container = document.getElementById('dropdown1')
		this.container.insertAdjacentHTML('afterbegin', FavoriteTicket.favoriteEmptyMsgTemplate())
		this.favoriteList= []

	}


	renderFavoriteTickets(ticket){
			const template = FavoriteTicket.favoriteTicketTemplate(ticket)
			return template
		
	}

	addFavoriteTicket(ticket){
		if (!this.duplicateSearchFavoriteTicket(ticket)) {
			if (!this.favoriteList.length) {
				this.clearContainer()
			}
			const template = this.renderFavoriteTickets(ticket)
			this.addTicketToFavoriteList(ticket,template)
			console.log(this.favoriteList);
			this.addToFavoriteContainer( template)
		}
	}

	clearContainer() {
	
		this.container.innerHTML = '';

	}

	addToFavoriteContainer(ticket){
		this.container.insertAdjacentHTML('afterbegin', ticket)
	}

	duplicateSearchFavoriteTicket(ticket){
		
		return this.favoriteList.find(item => JSON.stringify(item.ticket) === JSON.stringify(ticket))
	}

	addTicketToFavoriteList(ticket,string){
		const item = { ticket, string }
		this.favoriteList.push(item)
		
	}
	removeTicketFromfavoriteList(ticket){
		const index=this.favoriteList.indexOf(this.duplicateSearchFavoriteTicket(ticket))
		this.favoriteList.splice(index,1)
	}
	removeFavoriteTicket(ticket){
		
		this.removeTicketFromfavoriteList(ticket)
		ticket.remove()
		if(!this.favoriteList.length){
			this.addToFavoriteContainer(FavoriteTicket.favoriteEmptyMsgTemplate())
		}
	}

	getTicketByHTMLCode(card){
		const airline_logo = card.querySelector('.ticket-airline-img').getAttribute('src')
		const airline_name = card.querySelector('.ticket-airline-name').textContent
		const origin_name = card.querySelector('.ticket-city-origin').textContent
		const departure_at = card.querySelector('.ticket-time-departure').textContent
		const destination_name = card.querySelector('.ticket-city-destination').textContent
		const price = card.querySelector('.ticket-price').textContent
		const transfers = card.querySelector('.ticket-transfers').textContent.split(' ')[1]
		const flight_number = card.querySelector('.ticket-flight-number').textContent.split(' ')[2]
		return { airline_logo, airline_name, origin_name, departure_at, destination_name, price, transfers, flight_number }
	}

	static favoriteEmptyMsgTemplate() {
		return `
			<div class="tickets-empty-res-msg">
				 Избранных билетов нет
			</div>
		`
	}
	static favoriteTicketTemplate(ticket) {
		return`
		<div class="favorite-item  d-flex align-items-start">
							<img src="${ticket.airline_logo}" class="favorite-item-airline-img" />
							<div class="favorite-item-info d-flex flex-column">
								<div class="favorite-item-destination d-flex align-items-center">
									<div class="d-flex align-items-center mr-auto">
										<span class="favorite-item-city">${ticket.origin_name} </span>
										<i class="medium material-icons">flight_takeoff</i>
									</div>
									<div class="d-flex align-items-center">
										<i class="medium material-icons">flight_land</i>
										<span class="favorite-item-city">${ticket.destination_name}</span>
									</div>
								</div>
								<div class="ticket-time-price d-flex align-items-center">
									<span class="ticket-time-departure">${ticket.departure_at}</span>
									<span class="ticket-price ml-auto"> ${ticket.price}</span>
								</div>
								<div class="ticket-additional-info">
									<span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
									<span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
								</div>
								<a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
							</div>
						</div>
		`
	}


}
const favoriteTicketsUi = new FavoriteTicket();
export default favoriteTicketsUi
