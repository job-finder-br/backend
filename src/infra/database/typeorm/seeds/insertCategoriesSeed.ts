import { getRepository } from 'typeorm';
import { Seeder } from 'typeorm-seeding';

import { Category } from '@modules/jobWorks/domain';

class InsertCategories implements Seeder {
  public async run(): Promise<void> {
    const categoriesRepository = getRepository(Category);

    const data = [
      'Açougueiro (a)',
      'Administrador (a)',
      'Advogado (a)',
      'Agente',
      'Agricultor (a)',
      'Analista',
      'Arquiteto (a)',
      'Assistente (a)',
      'Atendente',
      'Auditor (a)',
      'Auxiliar Administrativo (a)',
      'Porteiro (a)',
      'Bancário (a)',
      'Bibliotecário (a)',
      'Biólogo (a)',
      'Biomédico (a)',
      'Bombeiro (a)',
      'Supervisor (a)',
      'Churrasqueiro (a)',
      'Cientista',
      'Cientista de Dados',
      'Consultor (a)',
      'Motorista',
      'Contador (a)',
      'Corretor (a)',
      'Cozinheiro (a)',
      'Designer',
      'Dentista',
      'Doméstica',
      'Economista',
      'Empacotador (a)',
      'Encanador (a)',
      'Enfermeiro (a)',
      'Entregador (a)',
      'Escritor (a)',
      'Estoquista',
      'Engenheiro (a)',
      'Farmacêutico (a)',
      'Fisioterapeuta',
      'Fonoaudiólogo (a)',
      'Fotógrafo (a)',
      'Garçom / Garçonete',
      'Geólogo (a)',
      'Gerente',
      'Jornalista',
      'Locutor (a)',
      'Matemático (a)',
      'Mecânico (a)',
      'Médico (a)',
      'Nutricionista',
      'Pedagogo (a)',
      'Personal Trainer',
      'Pesquisador (a)',
      'Professor (a)',
      'Programador (a)',
      'Promotor(a)',
      'Psicólogo (a)',
      'Publicitário (a)',
      'Secretário (a)',
      'Segurança',
      'Suporte Técnico',
      'Terapeuta',
      'Vendedor (a)',
      'Veterinário (a)',
      'Zelador (a)',
    ];

    const insertedData = data.map(element => {
      const category = new Category();

      Object.assign(category, {
        name: element,
        description: `Uma abre descrição acerca das resposabilidades de ${element}`,
      });

      return category;
    });

    await categoriesRepository.save(insertedData);
  }
}

export default InsertCategories;
