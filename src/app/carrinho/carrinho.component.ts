import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho:IProdutoCarrinho[] =[];
  total = 0;
  constructor(

    public carrinhoService:CarrinhoService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.calculaTotal();
  }

  calculaTotal(){

    this.total = this.itensCarrinho.reduce((prev,curr) => prev + (curr.preco * curr.quantidade),0);
  }

  removerProdutoCarrinho(produtoId:number){
       this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
       this.carrinhoService.removerProdutoCarrinho(produtoId);
       this.calculaTotal();


  }

  comprar(){

    alert("Parabéns , compra finalizada com sucesso");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }

}
