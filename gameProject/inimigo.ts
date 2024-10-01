import {IAtributosGerais} from "./atributosGerais"
import {Arma} from "./arma"
import {Criatura} from "./criatura"

export class Inimigo extends Criatura implements IAtributosGerais{
	private _resistencias:Arma[];
	private _vida:number;
	private _moveSpeed:number;
	private _dano:number;

	constructor((nome:string,posicao:number[][],resistencias:Arma[],vida:number,moveSpeed:number,dano:number){
		super(nome,posicao);
		this._resistencias=resistencias;
		this._vida=vida;
		this._moveSpeed=moveSpeed;
		this._dano=dano;
	}
	
	public addRes(resistencia:Arma){
		this._resistencias.push(resistencia);
	}

	public imprimeResistencias(){
		for(let i=0;i<this._resistencias.length;i++){
			console.log(`${this._resistencias[i]}\n`);
		}
	}
	
	get vida(){
		return this._vida;
	}
	
	set vida(vida:number){
		this._vida=vida;
	}
	
	get moveSpeed(){
		return this._moveSpeed;
	}
	
	set moveSpeed(moveSpeed:number){
		this._moveSpeed=moveSpeed;
	}
	
	get dano(){
		return this._dano;
	}
	
	set dano(dano:number){
		this._dano=dano;
	}
}


