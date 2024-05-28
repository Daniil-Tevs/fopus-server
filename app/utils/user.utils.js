export const UserFields = {
	ID: true,
	SURNAME: true,
	NAME: true,
	PARENT_NAME: true,
	EMAIL: true,
	ROLE_ID: true
}

export const switchOrderConditional = (roleId, id) => {
	switch (roleId) {
		case 1:
			return {}
		case 2:
			return {
				people_photo_order_SELLER_IDTopeople: {
					ID: id
				}
			}
		case 3:
			return {
				people_photo_order_BUYER_IDTopeople: {
					ID: id
				}
			}
	}
}
