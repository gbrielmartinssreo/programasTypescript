export class Criatura {
	protected _nome:string;
	protected _posicao:number[][];

	constructor(nome:string,posicao:number[][]){
		this._nome=nome;
		this._posicao=posicao;
	}
	protected get nome(){
		return this._nome;
	}

	protected set nome(nome:string){
		this._nome=nome;
	}

	protected get posicao(){
		return this._posicao;
	}

	protected set posicao(posicao:number[][]){
		this._posicao=posicao;
	}

}
	
