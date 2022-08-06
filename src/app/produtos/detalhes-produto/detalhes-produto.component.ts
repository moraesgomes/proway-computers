import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificationService } from 'src/app/notification.service';
import { IProduto} from 'src/app/produtos';
import { IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

   quantidade = 1;
   produto:IProduto  | undefined;
  constructor(
    private produtosService: ProdutosService,
    private route:ActivatedRoute,
    private notificationService:NotificationService,
    private carrinhoService:CarrinhoService  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const produtoId   = Number(routeParams.get("id"));
    this.produto = this.produtosService.getOne(produtoId);
  }

  adicionarAoCarrinho(){
      this.notificationService.notificar("Produto adicionado com sucesso ao carrinho");
      const produto:IProdutoCarrinho ={
        ...this.produto!,
           quantidade : this.quantidade
      }    
      this.carrinhoService.adicionarAoCarrinho(produto);

  }

}
