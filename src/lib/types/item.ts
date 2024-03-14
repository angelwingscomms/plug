export type Item = {
	n: string; //name
	i: string; //display_image
	ii: string[]; //images
	a: string; //about
	p: string; //price
	l: string;
	u: string; //user id
};

export type ItemListing = Pick<Item, 'n' | 'i' | 'p'>;
