import * as ElAutocompleteType from "@/types/components/element-plus/ElAutocomplete";
import * as ElInputType from "@/types/components/element-plus/ElInput";
import * as ElInputNumberType from "@/types/components/element-plus/ElInputNumber";

export interface ElFormComponents {
	ElAutocomplete: {
		Attributes: ElAutocompleteType.Attributes;
		Slots: ElAutocompleteType.Slots;
		Events: ElAutocompleteType.Events;
		Exposes: ElAutocompleteType.Exposes;
	};
	ElInput: {
		Attributes: ElInputType.Attributes;
		Slots: ElInputType.Slots;
		Events: ElInputType.Events;
		Exposes: ElInputType.Exposes;
	};
	ElInputNumber: {
		Attributes: ElInputNumberType.Attributes;
		Slots: ElInputNumberType.Slots;
		Events: ElInputNumberType.Events;
		Exposes: ElInputNumberType.Exposes;
	};
}