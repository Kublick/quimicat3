import { prisma } from '../src/server/db/client';

const createSucursales = async () => {
	await prisma.sucursal.createMany({
		data: [{ nombre: 'Matriz' }, { nombre: 'Gpe Victoria' }],
	});
};

const createPerfiles = async () => {
	await prisma.profile.createMany({
		data: [
			{
				nombre: 'Admin',
				enabledFeatures: {
					security: ['showPerfil', 'addUpdatePerfil', 'deletePerfil'],
					users: [
						'showUser',
						'addUpdateUser',
						'deleteUser',
						'showUsers',
						'addUpdateUsers',
						'deleteUsers',
					],
					patients: ['showPatients', 'addUpdatePatients', 'deletePatients'],
					config: [
						'showConfigPerfiles',
						'addUpdateConfigPerfiles',
						'deleteConfigPerfiles',
						'showConfigPruebas',
						'addUpdateConfigPruebas',
						'deleteConfigPrueba',
						'configDepartamento',
						'configMetodo',
					],
					medicos: [
						'addMedico',
						'showMedicos',
						'addUpdateMedicos',
						'deleteMedicos',
					],
					cliente: ['showClientes', 'addUpdateClientes'],
				},
			},
			{
				nombre: 'User',
				enabledFeatures: {},
			},
		],
	});
};

const createMuestras = async () => {
	await prisma.muestra.createMany({
		data: [
			{
				clave: '1 SUB',
				descripcion: 'SUERO',
				nombreTubo: 'TUBO AMARILLO SUBROGADO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '1',
				descripcion: 'SUERO 1',
				nombreTubo: 'TUBO AMARILLO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '1.2',
				descripcion: 'SUERO 2',
				nombreTubo: 'TUBO AMARILLO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '1.3',
				descripcion: 'SUERO 3',
				nombreTubo: 'TUBO AMARILLO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '1.4',
				descripcion: 'SUERO 4',
				nombreTubo: 'TUBO AMARILLO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '1.5',
				descripcion: 'SUERO 5',
				nombreTubo: 'TUBO AMARILLO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '1.6',
				descripcion: 'SUERO 6',
				nombreTubo: 'TUBO AMARILLO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '100',
				descripcion: 'ESPUTO',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '110',
				descripcion: 'LIQ. CEFALORRAQUIDEO',
				nombreTubo: 'TUBO ESTERIL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '111',
				descripcion: 'LIQ. SIfalseVIAL',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '120',
				descripcion: 'ESPERMA',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '120',
				descripcion: 'MUESTRAS DIVERSAS',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '130',
				descripcion: 'SANGRE',
				nombreTubo: 'FRASCO RUIZ CASTAÑEDA',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '20',
				descripcion: 'ORINA',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '20.2',
				descripcion: 'ORINA 2',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '20.3',
				descripcion: 'ORINA 3',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '60',
				descripcion: 'PLASMA CITRATADO',
				nombreTubo: 'TUBO AZUL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '61',
				descripcion: 'PLASMA HEPARINIZADO',
				nombreTubo: 'TUBO VERDE',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '62',
				descripcion: 'PLASMA EDTA',
				nombreTubo: 'TUBO MORADO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '7',
				descripcion: 'EXPECTORACION',
				nombreTubo: 'FRASCO ESTERIL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '7.2',
				descripcion: 'EXPECTORACION 2',
				nombreTubo: 'FRASCO ESTERIL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '7.3',
				descripcion: 'EXPECTORACION 3',
				nombreTubo: 'FRASCO ESTERIL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '7.4',
				descripcion: 'EXPECTORACION 4',
				nombreTubo: 'FRASCO ESTERIL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '7.5',
				descripcion: 'EXPECTORACION 5',
				nombreTubo: 'FRASCO ESTERIL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '70',
				descripcion: 'SANGRE TOTAL',
				nombreTubo: 'TUBO MORADO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '80',
				descripcion: 'HECES',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '80.2',
				descripcion: 'HECES 2',
				nombreTubo: 'FRASCO 2',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '80.3',
				descripcion: 'HECES 3',
				nombreTubo: 'FRASCO 3',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '85',
				descripcion: 'GALON DE ORINA',
				nombreTubo: 'GALON DE ORINA',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '90',
				descripcion: 'SALIVA',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '91',
				descripcion: 'EXUDADO DE MUCOSAS',
				nombreTubo: 'LAMINILLA',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: '92',
				descripcion: 'GASO',
				nombreTubo: 'JERINGA HEPARINIZADA',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'BIOPSIA',
				descripcion: 'BIOPSIA',
				nombreTubo: 'FRASCO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'CAJA PETRI',
				descripcion: 'CAJA PETRI',
				nombreTubo: 'CAJA PETRI',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'CAJA PETRI 2',
				descripcion: 'CAJA PETRI 2',
				nombreTubo: 'CAJA PETRI 2',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXCER',
				descripcion: 'EXUDADO CERVICAL',
				nombreTubo: 'HISOPO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXCON',
				descripcion: 'EXUDADO CONJUNTIVAL',
				nombreTubo: 'STUART',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXF',
				descripcion: 'EXUDADO FARINGEO',
				nombreTubo: 'STUART',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXFAR',
				descripcion: 'EXUDADO FARINGEO',
				nombreTubo: 'STUART',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXU',
				descripcion: 'EXUDADO DE',
				nombreTubo: 'STUART',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXVAG',
				descripcion: 'EXUDADO VAGINAL',
				nombreTubo: 'STUART',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXVAG.2',
				descripcion: 'EXUDADO VAGINAL 2',
				nombreTubo: 'STUART',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'EXVAG.3',
				descripcion: 'EXUDADO VAGINAL 3',
				nombreTubo: 'STUART',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'LAMINILLA',
				descripcion: 'LAMINILLA',
				nombreTubo: 'LAMINILLA',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'LIBRO CULTIVOS',
				descripcion: 'LIBRO CULTIVOS',
				nombreTubo: 'LIBRO CULTIVOS',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'LIQ. ASCITIS',
				descripcion: 'LIQ. ASCITIS',
				nombreTubo: 'FRASCO ESTERIL',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'OR24HRS',
				descripcion: 'ORINA DE 24 HRS',
				nombreTubo: 'GALON',
				barCode: true,
				excludeStatus: false,
			},
			{
				clave: 'OTRAS',
				descripcion: 'OTRAS',
				nombreTubo: '-',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'PLACA',
				descripcion: 'PLACA',
				nombreTubo: '',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'PLEU',
				descripcion: 'LIQ. PLEURAL',
				nombreTubo: 'FRASCO ESTERIL PLEU',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'REVISION',
				descripcion: 'REVISION',
				nombreTubo: 'false REQUIERE MUESTRA',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'TM SUBROGADO',
				descripcion: 'SANGRE TOTAL',
				nombreTubo: 'TUBO MORADO SUBROGADO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'TSH',
				descripcion: 'SANGRE TOTAL',
				nombreTubo: 'PAPEL FILTRO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'TT ROJO',
				descripcion: 'SANGRE TOTAL',
				nombreTubo: 'TUBO ROJO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'TT ROJO',
				descripcion: 'SANGRE TOTAL',
				nombreTubo: 'TUBO ROJO SUBROGADO',
				barCode: false,
				excludeStatus: false,
			},
			{
				clave: 'VARIAS',
				descripcion: 'MUESTRAS VARIAS',
				nombreTubo: 'MUESTRAS VARIAS',
				barCode: false,
				excludeStatus: false,
			},
		],
	});
};
const createMetodos = async () => {
	await prisma.metodo.createMany({
		data: [
			{
				nombre: 'Aglutinación en placa',
			},
			{
				nombre: 'CITOMETRIA DE FLUJO, MICROSCOPIA, IMPEDANCIA',
			},
			{
				nombre: 'Citometría de Flujo',
			},
			{
				nombre: 'COAGULOMETRICO AUTOMATIZADO',
			},
			{
				nombre: 'Coagulometría',
			},
			{
				nombre: 'Coagulometría con Veneno de Russell.',
			},
			{
				nombre: 'Colorimétrico Automatizado',
			},
			{
				nombre: 'Cromatografía en Capa Fina Flourometría',
			},
			{
				nombre: 'Cultivo Microbiológico',
			},
			{
				nombre: 'Cálculo Bioinformático',
			},
			{
				nombre: 'E.L.I.S.A.',
			},
			{
				nombre: 'Electrofóresis',
			},
			{
				nombre: 'ENSAYO INMUNOABSORCIÓN LIGADO A ENZIMAS (ELISA).',
			},
			{
				nombre: 'ENSAYO INMUNOFLUORESCENTE INDIRECTO',
			},
			{
				nombre: 'ENZIMOINMUNOANALISIS',
			},
			{
				nombre: 'Enzimático',
			},
			{
				nombre: 'Enzimático Automatizado',
			},
			{
				nombre: 'Eritroaglutinación',
			},
			{
				nombre: 'Espectrofotometría',
			},
			{
				nombre: 'Espectrofotometría Automatizada',
			},
			{
				nombre: 'FOTOMETRIA, MICROSCOPIA',
			},
			{
				nombre: 'FOTOMETRÍA AUTOMATIZADA',
			},
			{
				nombre: 'Fotometría de Reflectancia',
			},
			{
				nombre: 'Fotoóptico',
			},
			{
				nombre: 'Impedancia Eléctrica',
			},
			{
				nombre: 'Inmunoaglutinación',
			},
			{
				nombre: 'Inmunoaglutinación en Látex',
			},
			{
				nombre: 'Inmunoaglutinación en Placa',
			},
			{
				nombre: 'Inmunoaglutinación en tubo',
			},
			{
				nombre: 'Inmunocromatografia',
			},
			{
				nombre: 'Inmunoensayo Cromatográfico',
			},
			{
				nombre: 'INMUNOENSAYO ENZIMATICO (E.I.A)',
			},
			{
				nombre: 'INMUNOENSAYO ENZIMÁTICO (EIA)',
			},
			{
				nombre: 'Inmunoenzimático',
			},
			{
				nombre: 'INMUNOFLUORESCENCIA INDIRECTA (IFI)',
			},
			{
				nombre: 'Inmunoinfluorescencia Indirecta',
			},
			{
				nombre:
					'INMUNOTURBIDIMETRÍA/ELISA/AGLUTINACIÓN DE PARTICULAS DE LÁTEX/INMUNOFLUORESCENCIA INDIRECTA',
			},
			{
				nombre: 'Ion Selectivo',
			},
			{
				nombre: 'MICROSCOPIA INMUNOFLUORESCENTE',
			},
			{
				nombre: 'MICROSCOPIA INMUNOFLUORESCENTE',
			},
			{
				nombre: 'Microscopia, Tincion de Ziehl - Nielsen',
			},
			{
				nombre: 'Microscopía Óptica',
			},
			{
				nombre: 'Nefelometría',
			},
			{
				nombre: 'PCR',
			},
			{
				nombre: 'PCR REAL TIME',
			},
			{
				nombre: 'PCR Tiempo Real',
			},
			{
				nombre: 'PRECIPITACIÓN',
			},
			{
				nombre: 'Quimioluminiscencia',
			},
			{
				nombre: 'Reacción Benedict',
			},
			{
				nombre: 'Sedimentacion de hematies',
			},
			{
				nombre: 'Tinción de Ziehl–Neelsen',
			},
			{
				nombre: 'Tira Reactiva',
			},
			{
				nombre: 'Tira Reactiva/Microscopía Óptica',
			},
			{
				nombre: 'Turbidimetría',
			},
			{
				nombre: 'Westergren',
			},
		],
	});
};

const createDepartamentos = async (): Promise<void> => {
	await prisma.departamento.createMany({
		data: [
			{
				nombre: 'BIOQUÍMICA CLÍNICA',
			},
			{
				nombre: 'COAGULACIÓN',
			},
			{
				nombre: 'COVID',
			},
			{
				nombre: 'ESPECIALES',
			},

			{
				nombre: 'HEMATOLOGÍA',
			},

			{
				nombre: 'HORMONAS',
			},
			{
				nombre: 'INMUNOLOGÍA',
			},
			{
				nombre: 'LASER',
			},
			{
				nombre: 'MICROBIOLOGÍA',
			},
			{
				nombre: 'PARASITOLOGÍA',
			},
			{
				nombre: 'PERFILES',
			},
			{
				nombre: 'SEROLOGÍA',
			},
			{
				nombre: 'UROANÁLISIS',
			},
		],
	});
};

async function main() {
	await createSucursales();
	await createPerfiles();
	await createMuestras();
	await createMetodos();
	await createDepartamentos();
}

main();
