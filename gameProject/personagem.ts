import {Arma} from "./arma";
import {Passiva} from "./passiva";
import {IAtributosEspecificos} from "./atributosEspecificos";
import {IAtributosGerais} from "./atributosGerais";
import {Criatura} from "./criatura"; 

export class Personagem extends Criatura implements IAtributosEspecificos,IAtributosGerais{
	private _armas:Arma[];
	private _passivas:Passiva[];
	private _armadura:number;
	private _regeneracao:number;
	private _area:number;
	private _cooldown:number;
	private _revival:number;
	private _vida:number;
	private _moveSpeed:number;
	private _dano:number;

	constructor(nome:string,posicao:number[][],armas:Arma[],passivas:Passiva[],armadura:number,regeneracao:number,area:number,cooldown:number,revival:number,vida:number,moveSpeed:number,dano:number){
		super(nome,posicao);
		this._armas=armas;
		this._passivas=passivas;
		this._armadura=armadura;
		this._regeneracao=regeneracao;
		this._area=area;
		this._cooldown=cooldown;
		this._revival=revival;
		this._vida=vida;
		this._moveSpeed=moveSpeed;
		this._dano=dano;
	}

	public addArma(arma:Arma){
		this._armas.push(arma);
	}

	public imprimeArmas(){
		for(let i=0;i<this._armas.length;i++){
			console.log(`${this._armas[i]}\n`);
		}
	}

	public addPassiva(passiva:Passiva){
		this._passivas.push(passiva);
	}

	public imprimePassiva(){
		for(let i=0;i<this._passivas.length;i++){
			console.log(`${this._passivas[i]}\n`);
		}
	}

	get armadura(){
		return this._armadura;
	}

	set armadura(armadura:number){
		this._armadura=armadura;
	}
	
	get regeneracao(){
		return this._regeneracao;
	}
	
	set regeneracao(regeneracao:number){
		this._regeneracao=regeneracao;
	}
	
	get area(){
		return this._area=area;
	}
	
	set area(area:number){
		this._area=area;
	}
	
	get cooldown(){
		return this._cooldown;
	}
	
	set cooldown(cooldown:number){
		this._cooldown=cooldown;
	}
	
	get revival(){
		return this._revival;
	}
	
	set revival(revival:number){
		this._revival=revival;
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


