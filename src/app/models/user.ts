export class User{
  name!: string | null;
  email!: string | null;
  photo!: string | null;
  uid!: string;
	constructor(
			name?: string,
			email?: string,
			photo?: string,
			uid?: string,
	){}
}