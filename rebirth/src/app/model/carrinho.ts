export interface Carrinho {
    id?: string;
    idCliente: string;
    nome: string;
    categoria: string;
    imagem?: string;
    quantidade: number;
    preco: number;
}