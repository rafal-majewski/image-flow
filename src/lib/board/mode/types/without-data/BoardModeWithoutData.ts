export type BoardModeWithoutData<KindNameToUse extends string> = Readonly<{
	kindName: KindNameToUse;
}>;
