export class Mapa{
	private _nome:string;
	private _tamanhoNxN:number;

	constructor(nome:string,tamanhoNxN:number){
		this._nome:nome;
		this._tamanhoNxN:tamanhoNxN;
	}

	get nome(){
		return this._nome;
	}

	set nome(nome:string){
		this._nome:nome;
	}

	get tamanhoNxN(){
		return
