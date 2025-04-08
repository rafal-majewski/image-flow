export type BoardMode<KindNameToUse extends string, DataToUse> = Readonly<
	{kindName: KindNameToUse} & (readonly [DataToUse] extends readonly [never] ?
		{}
	:	{data: DataToUse})
>;
