import {
	Icon,
} from 'antd';

let props = {
	componentColor: {
    fontColor: {
			id: 'fontColor',
			label: '文字颜色',
			value: '',
		},
		bgColor: {
			id: 'bgColor',
			label: '背景颜色',
			value: '',
		},
  },
  componentTheme: {
    size: {
  		id: 'size',
  		value: 'large',
  		label: '组件尺寸',
  		title: '选择组件尺寸',
  		options: [
				{id: 1, label: '默认大小', value: 'default'},
				{id: 2, label: '大尺寸', value: 'large'},
				{id: 3, label: '小尺寸', value: 'small'},
  		]
  	},
  	theme: {
  		id: 'theme',
  		value: 'primary',
  		label: '默认主题',
  		title: '选择组件主题',
  		options: [
				{id: 1, label: 'default', value: 'default'},
				{id: 2, label: 'primary', value: 'primary'},
				{id: 3, label: 'dashed', value: 'dashed'},
				{id: 4, label: 'danger', value: 'danger'},
  		]
  	},
  	layoutStyle: {
  		id: 'layoutStyle',
  		value: 'vertical',
  		label: '组件风格',
  		title: '选择组件风格',
  		options: [
				{id: 1, label: '垂直风格', value: 'vertical'},
				{id: 2, label: '水平风格', value: 'horizontal'},
  		]
  	},
  },
  formStatus: {
    visibility: true,
  	locked: false,
  	mustInput: false,
  	autoSum: false,
  },
  inputAlignCarry: {
    textAlign: 'left',
		carry: 'round',
  },
  inputDecoration: {
    addonBefore: {
			id: 'addonBefore',
			type: 'input',
			label: '前缀文字',
			addonBefore: '前缀',
			addonAfter: '',
			prefix: '',
			suffix: '',
			placehodler: '如：数量, 单价, 总金额 等',
			value: '',
		},
		addonAfter: {
			id: 'addonAfter',
			type: 'input',
			label: '后缀文字',
			addonBefore: '',
			addonAfter: '后缀',
			prefix: '',
			suffix: '',
			placehodler: '如：元, ￥, $ 等',
			value: '',
		},
		prefix: {
			id: 'prefix',
			type: 'select',
			label: '前置图标',
			placehodler: '请选择前置图标',
			value: '',
			options: [
				{ id: 1, value: 'user', icon: 'user' },
				{ id: 2, value: 'lock', icon: 'lock' },
				{ id: 3, value: 'cloud', icon: 'cloud' },
				{ id: 4, value: 'smile', icon: 'smile' },
				{ id: 5, value: 'link', icon: 'link' },
				{ id: 6, value: 'mail', icon: 'mail' },
			],
		},
		suffix: {
			id: 'suffix',
			type: 'select',
			label: '后置图标',
			placehodler: '请选择后置图标',
			value: '',
			options: [
				{ id: 1, value: (<Icon type="close-circle" />), icon: 'close-circle' },
				{ id: 2, value: (<Icon type="close-circle-o" />), icon: 'close-circle-o' },
				{ id: 3, value: (<Icon type="check-circle" />), icon: 'check-circle' },
				{ id: 4, value: (<Icon type="check-circle-o" />), icon: 'check-circle-o' },
			],
		},
  },
  inputValue: {
    label: {
			id: 'label',
			label: '标签文字',
			value: '',
			defaultValue: '',
			placeholder: '组件标签文字',
		},
		placeholder: {
			id: 'placeholder',
			label: '提示文字',
			value: '',
			defaultValue: '',
			placeholder: '组件提示文字',
		},
		defaultValue: {
			id: 'defaultValue',
			label: '默认值',
			value: '',
			defaultValue: '',
			placeholder: '组件默认值',
		},
		value: {
			id: 'value',
			label: '当前值',
			value: '',
			defaultValue: '',
			placeholder: '存在则覆盖默认值',
		},
  },
  fontStyle: {
    fontStyle: {
			id: 'fontStyle',
			label: '文字样式',
			values: [],
			options: [
				{id: 'fontWeight', label: '加粗', value: 'bold', checked: false},
				{id: 'fontStyle', label: '斜体', value: 'italic', checked: false},
				{id: 'textDecoration', label: '下划线', value: 'underline', checked: false}
  		]
		},
		fontSize: {
			id: 'fontSize',
			label: '字号大小',
			title: '请选择字号大小',
			value: '12px',
			options: [
				{id: 'ft10', label: '10px', value: '10px'},
				{id: 'ft12', label: '12px', value: '12px'},
				{id: 'ft14', label: '14px', value: '14px'},
				{id: 'ft16', label: '16px', value: '16px'},
				{id: 'ft20', label: '20px', value: '20px'},
				{id: 'ft24', label: '24px', value: '24px'},
				{id: 'ft28', label: '28px', value: '28px'},
				{id: 'ft32', label: '32px', value: '32px'},
				{id: 'ft36', label: '36px', value: '36px'},
				{id: 'ft40', label: '40px', value: '40px'},
				{id: 'ft44', label: '44px', value: '44px'},
				{id: 'ft48', label: '48px', value: '48px'},
				{id: 'ft52', label: '52px', value: '52px'},
				{id: 'ft56', label: '56px', value: '56px'},
				{id: 'ft60', label: '60px', value: '60px'},
				{id: 'ft64', label: '64px', value: '64px'},
				{id: 'ft68', label: '68px', value: '68px'},
			]

		},
		fontFamily: {
			id: 'fontFamily',
			label: '字体',
			title: '请选择字体',
			value: 'sans serif',
			options: [
				{id: 'ff1', label: 'sans serif', value: 'sans serif'},
				{id: 'ff2', label: '微软雅黑', value: 'Microsoft Yahei'},
				{id: 'ff3', label: '黑体', value: 'Heiti'},
			],
		},
  },
};


export default props;