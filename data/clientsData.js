import { v4 as uuidv4 } from 'uuid';

// Import images
import CentralImage from '../public/images/brands/central.png';
import ChexSystemsImage from '../public/images/brands/chexsystems.png';
import NTTDataImage from '../public/images/brands/nttdata.svg';
import ParkGenieImage from '../public/images/brands/parkgenie.png';
import AbellImage from '../public/images/brands/abell.png';
import BSWImage from '../public/images/brands/bsw.svg';
import CSRImage from '../public/images/brands/csr.svg';
import GowlingImage from '../public/images/brands/gowling.png';
import HogelLovellsImage from '../public/images/brands/hl-logo.svg';
import JeldWenImage from '../public/images/brands/jeldwen.svg';
import MccormickImage from '../public/images/brands/mccormick.png';
import TJCImage from '../public/images/brands/tjc.svg';
import WPCareyImage from '../public/images/brands/wpcarey.svg';
import WPCareyFoundationImage from '../public/images/brands/wpcarey-foundation.svg';

export const clientsHeading = 'Some of the brands I worked with';

export const clientsData = [
	{
		id: uuidv4(),
		title: 'BSW',
		img: BSWImage,
		url: 'https://www.bswhealth.com',
	},
	{
		id: uuidv4(),
		title: 'TJC',
		img: TJCImage,
		url: 'https://www.jointcommission.org',
	},
	{
		id: uuidv4(),
		title: 'CSR',
		img: CSRImage,
		url: 'https://www.crystalgolfresort.com/',
	},
	{
		id: uuidv4(),
		title: 'NTTData',
		img: NTTDataImage,
		url: 'https://www.nttdata.com',
	},
	{
		id: uuidv4(),
		title: 'Central',
		img: CentralImage,
		url: 'https://www.central.com',
	},
	{
		id: uuidv4(),
		title: 'ChexSystems',
		img: ChexSystemsImage,
		url: 'https://www.chexsystems.com',
	},
	{
		id: uuidv4(),
		title: 'ParkGenie',
		img: ParkGenieImage,
		url: 'https://www.parkgenie.in',
	},
	{
		id: uuidv4(),
		title: 'Abell',
		img: AbellImage,
		url: 'https://www.abellpestcontrol.com/',
	},

	{
		id: uuidv4(),
		title: 'Gowling',
		img: GowlingImage,
		url: 'https://www.gowlingwlg.com',
	},
	{
		id: uuidv4(),
		title: 'HogelLovells',
		img: HogelLovellsImage,
		url: 'https://www.hoganlovells.com',
	},
	{
		id: uuidv4(),
		title: 'JeldWen',
		img: JeldWenImage,
		url: 'https://www.jeld-wen.com',
	},
	{
		id: uuidv4(),
		title: 'Mccormick',
		img: MccormickImage,
		url: 'https://www.mccormick.com',
	},

	{
		id: uuidv4(),
		title: 'WPCarey',
		img: WPCareyImage,
		url: 'https://www.wpcarey.com',
	},
	{
		id: uuidv4(),
		title: 'WPCareyFoundation',
		img: WPCareyFoundationImage,
		url: 'https://www.wpcareyfoundation.org',
	},
];
