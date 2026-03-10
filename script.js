 const input_add = document.querySelector('#input_add');
    const select_add = document.querySelector('#select_add');


    const input_busca = document.querySelector('#input_busca');
    const filtro_check = document.querySelectorAll('.filtro');
    let banco = JSON.parse(localStorage.getItem('banco')) || [];

    const lista = document.querySelector('#lista');

    
    const busca_vlr = input_busca.value.trim();

    input_busca.addEventListener('input', atualizar_lista);
    filtro_check.forEach(check => {
        check.addEventListener('change', atualizar_lista);

    });
    atualizar_lista()

    function atualizar_lista(){

        lista.innerHTML = ``

        const busca_vlr = input_busca.value.toLowerCase();

        const filtros_selecionados = Array.from(filtro_check)
        .filter(check => check.checked)
        .map(check => check.value);

        banco.forEach((item, index) => {
            const corresponde_nome = item.nome.toLowerCase().includes(busca_vlr);

            const corresponde_categoria = filtros_selecionados.length === 0 || filtros_selecionados.includes(item.categoria);
            if (corresponde_nome &&  corresponde_categoria){

                const linha = document.createElement('tr');
            

                linha.innerHTML = `
                    <td class="check" ><input  type="checkbox" ${item.checked ? 'checked': ''} onchange="alternar_check(${index})"></td>
                    <td class="item" >${item.nome}</td>
                    <td class="categoria" >${item.categoria}</td>
                    <td class="excluir" ><button onclick="excluir_item(${index})">X</button></td>`
                lista.appendChild(linha)};
                    })
                };
            
                
                       
               

        
    function salvar_item(){
        const add_vlr = input_add.value.trim();
        const select_vlr = select_add.value;
        if (add_vlr === '' || select_vlr === ''){
            alert('Favor, preencha todos os campos.');
            return;
        }
      
        const dados = {
            checked : false,
            nome : add_vlr,
            categoria : select_vlr
        };
        banco.push(dados);
        localStorage.setItem('banco', JSON.stringify(banco));

        input_add.value = ''
        select_add.value = ''
    
        atualizar_lista();
    }
    function excluir_item(index){

        banco.splice(index, 1);
        localStorage.setItem('banco', JSON.stringify(banco));

        atualizar_lista();
    }
    function alternar_check(index){
        banco[index].checked = !banco[index].checked;
        localStorage.setItem('banco', JSON.stringify(banco));
        
    }
    
