import IFComponents from '../components/IFComponents';

let {
	IFInputNumber,
	IFInputNormal,
	IFInputPhone,
	IFDropdown,
	IFButtonNormal,
	IFSmartTable,
	IFTreeSelect,
	IFRangePicker,
	IFRadioGroupHorizontal,
	IFRadioGroupVertical,
	IFUploadImage,
	IFCheckBoxGroupVertical,
} = IFComponents;

const AntdComponents = {
	IFCheckBoxGroupVertical:(option) => <IFCheckBoxGroupVertical ref={option.id} option={option} />,
	//IFCheckBoxGroupVertical:(option) => <IFCheckBoxGroupVertical ref={option.id} option={option} />,
	//IFCheckBoxGroupVertical:(option) => <IFCheckBoxGroupVertical ref={option.id} option={option} />,
	//IFCheckBoxGroupVertical:(option) => <IFCheckBoxGroupVertical ref={option.id} option={option} />,
	IFInputNumber: (option) => <IFInputNumber ref={option.id} option={option} />,
	IFInputNormal: (option) => <IFInputNormal ref={option.id} option={option} />,
	IFInputPhone: (option) => <IFInputPhone ref={option.id} option={option} />,
	IFDropdown: (option) => <IFDropdown ref={option.id} option={option} />,
	IFButtonNormal: (option) => <IFButtonNormal ref={option.id} option={option} />,
	IFUploadImage: (option) => <IFUploadImage ref={option.id} option={option} />,
	IFRadioGroupHorizontal:  (option) => <IFRadioGroupHorizontal ref={option.id} option={option} />,
	IFRadioGroupVertical:  (option) => <IFRadioGroupVertical ref={option.id} option={option} />,
	IFRangePicker: (option) => <IFRangePicker ref={option.id} option={option} />,
	IFTreeSelect: (option) => <IFTreeSelect ref={option.id} option={option} />,
	IFSmartTable: (option) => <IFSmartTable ref={option.id} option={option} />,
}

export default
class ComponentFactory {
	static create(type, option) {
		console.log(`Creating ${type} element with option ${JSON.stringify(option)}`);
		return AntdComponents[type](option);
	}
}