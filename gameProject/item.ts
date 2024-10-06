export abstract class Item{
	protected _nome:string;
	protected _nivel:number=1;
	protected _maxNivel:number;

	constructor(nome:string,maxNivel:number){
		this._nome=nome;
		this._maxNivel=maxNivel;
	}

	get nome(){
		return this._nome;
	}

	set nome(nome:string){
		this._nome=nome;
	}

	get nivel(){
		return this._nivel;
	}

	set nivel(nivel:number){
		this._nivel=nivel;
	}

	get maxNivel(){
		return this._maxNivel;
	}

	set maxNivel(maxNivel:number){
		this._maxNivel=maxNivel;
	}
}
