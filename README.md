<h1  align="center" >E-Commerce System - Engenharia de Software</h1>

 <h2 align="center">Sistema de E-Commerce com Spring Boot e Angular</h2><p align="center"> <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"> <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"> </p>

 <h2 align="center">Introdução</h2>

 <p  align="center">A Engenharia de Software é uma disciplina fundamental no desenvolvimento de sistemas computacionais, focada na aplicação de abordagens sistemáticas, disciplinadas e quantificáveis para a concepção, desenvolvimento, operação e manutenção de software. Surgiu como resposta à chamada "crise do software" na década de 1960, quando os projetos de software frequentemente excediam prazos, orçamentos e falhavam em atender aos requisitos.</p>

 No mundo moderno, onde o software está presente em praticamente todos os aspectos da vida cotidiana e dos negócios, a Engenharia de Software se tornou essencial para:

 <ul>
  <li>🔹 Garantir a qualidade dos produtos de software</li>
  <li>🔹 Gerenciar a complexidade crescente dos sistemas</li>
  <li>🔹 Reduzir custos e prazos de desenvolvimento</li>
  <li>🔹 Facilitar a manutenção e evolução dos sistemas</li>
  <li>🔹 Assegurar a satisfação dos usuários finais</li>
</ul>

 <h3 align="center"> Contexto do Trabalho Proposto</h3>

 Este projeto de sistema e-commerce foi desenvolvido como parte integrante da disciplina de Engenharia de Software ofertada no curso de engenharia da computação no CEFET-MG, com o objetivo de aplicar na prática os conceitos teóricos aprendidos em sala de aula. O trabalho engloba:

 <ul>
  <li>🔹 <strong>Aplicação de metodologias ágeis</strong> no ciclo de desenvolvimento</li>
  <li>🔹 <strong>Engenharia de requisitos</strong> completa para um sistema real</li>
  <li>🔹 <strong>Modelagem de dados</strong> para um domínio complexo</li>
  <li>🔹 <strong>Desenvolvimento full-stack</strong> com tecnologias modernas (Spring Boot e Angular)</li>
  <li>🔹 <strong>Boas práticas</strong> de arquitetura de software e padrões de projeto</li>
</ul>


 <h3 align="center"> Papel de um Sistema de E-Commerce</h3>

 <table>
        <tr> <th>Função</th> <th>Impacto</th> </tr> 
        <tr> <td>Vitrine Virtual</td> <td>Apresenta produtos/serviços de forma organizada e atraente 24/7</td> </tr>
         <tr> <td>Processamento de Pedidos</td> <td>Automatiza desde a seleção até o fechamento da compra</td> </tr>
         <tr> <td>Gestão de Clientes</td> <td>Armazena dados, histórico e preferências para personalização</td> </tr>
         <tr> <td>Integração de Pagamentos</td> <td>Oferece múltiplas formas de pagamento seguras</td> </tr> 
         <tr> <td>Logística</td> <td>Gerencia estoque, fretes e entregas</td> </tr> 
 </table>

<p align="center"> Este projeto acadêmico busca refletir essa realidade do comércio digital, implementando um sistema que encapsula essas funcionalidades críticas enquanto aplica os princípios da Engenharia de Software para garantir qualidade, manutenibilidade e escalabilidade.</p>


 <h3 align="center"> Funcionalidades do Trabalho Proposto</h3>

O sistema proposto contempla um conjunto abrangente de funcionalidades organizadas em módulos principais:

<h4>Módulos Principais</h4>
Gestão de Usuários   █████████████████████████ (25%)

Gestão de Produtos   ████████████████████████████████ (30%)

Categorias           ███████████████ (15%)

Carrinho/Checkout    ████████████████████████████████ (30%)

<h4>Gerenciamento de Usuários</h4>

CRUD de Usuários: 
<ul>
  <li><strong>Create:</strong> Cadastro de novos usuários com validação de dados</li>
  <li><strong>Read:</strong> Consulta de perfil e listagem de usuários (admin)</li>
  <li><strong>Update:</strong> Edição de informações pessoais e credenciais</li>
  <li><strong>Delete:</strong> Inativação de contas (soft delete)</li>
</ul> 

Sistema de Roles (Papéis):
<table> <tr> <th>Role</th> <th>Permissões</th> <th>Funcionalidades Restritas</th> </tr> <tr> <td>Cliente</td> <td>Comprar produtos, gerenciar perfil</td> <td>Apenas operações de compra</td> </tr> <tr> <td>Vendedor</td> <td>Gerenciar produtos próprios</td> <td>CRUD apenas para produtos vinculados</td> </tr> <tr> <td>Administrador</td> <td>Acesso completo ao sistema</td> <td>Todas as funcionalidades</td> </tr> </table>



<h4>Gerenciamento de Produtos</h4>

CRUD de Usuários: 
<ol>
    <li>Cadastro com informações completas (nome, descrição, preço, estoque)</li>
    <li>Visualização em catálogo público ou painel administrativo</li>
    <li>Atualização de dados e status (disponível/esgotado)</li>
    <li>Remoção lógica (não exclui fisicamente)</li>
  </ol>



<h4>Gerenciamento de Categorias</h4>

<ul class="feature-list">
  <li><span class="badge">Create</span> Cadastro hierárquico (categorias e subcategorias)</li>
  <li><span class="badge">Read</span> Navegação por categorias no frontend</li>
  <li><span class="badge">Update</span> Reorganização da árvore de categorias</li>
  <li><span class="badge">Delete</span> Remoção com validação de produtos vinculados</li>
</ul>





<h4>Carrinho de Compras</h4>

<table> <tr> <th>Funcionalidade</th> <th>Descrição Técnica</th> </tr> <tr> <td>Adição de Itens</td> <td>Session storage + persistência no banco após login</td> </tr> <tr> <td>Atualização de Quantidades</td> <td>Validação contra estoque disponível</td> </tr> <tr> <td>Remoção de Itens</td> <td>Exclusão individual ou limpeza total</td> </tr> <tr> <td>Cálculo de Totais</td> <td>Soma de subtotais + cálculo de frete</td> </tr> </table>


Estas funcionalidades foram projetadas para atender aos requisitos básicos de um sistema e-commerce moderno, enquanto mantêm a simplicidade adequada para um projeto acadêmico, permitindo a aplicação prática dos conceitos de Engenharia de Software estudados.








